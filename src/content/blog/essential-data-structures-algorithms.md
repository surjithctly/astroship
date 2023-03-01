---
draft: false
title: " Introduction to the Essential Data Structures & Algorithms"
snippet: ""
image: {
    src: "https://www.acervera.com/blog/2020/04/sbt-crossversion-release-bintray/sbt-crossversion-release-bintray.svg",
    alt: "How to sbt + crossScalaVersions + Bintray"
}
publishDate: "2022-11-09 16:39"
category: "Courses"
author: "Angel Cervera Claudio"
tags: [webdev, tailwindcss, frontend]
---

## Table of content
<!-- toc -->

## Introduction
Several years ago I created a Github project called [sbt-multimodule-template](https://github.com/angelcervera/sbt-multimodule-template),
to help me to have a good baseline sbt multi module project to use as a template in my new projects.

I started with simple stuff and then, I needed to create submodules, releases for more than one Scala version, publishing
into public Maven repos, etc.

Today, I will update and cover how to release and publish multi-module "cross Scala versions" sbt projects into Bintray, using sbt.

I updated the project to use the last version of sbt and plugins. At the moment of writing this post:
- sbt 1.3.10
- sbt-release 1.0.13
- sbt-bintray 0.5.6
- Scala 2.10.7, 2.11.12, 2.12.11 and 2.13.2

## Sbt Version
The behavior of sbt-release is not consistence between sbt version, so it is important to set the right version in function
of your `built.sbt` content. For example, from the [www.scala-sbt.org documentation](https://www.scala-sbt.org/1.x/docs/Cross-Build.html):
> sbt-release implemented cross building support by copy-pasting sbt 0.13’s + implementation, so at least as of
> sbt-release 1.0.10, it does not work correctly with sbt 1.x’s cross building, which was prototyped originally as sbt-doge.

So it is important to double check the sbt version used. In my example, `1.3.10`. The content of my `project/build.properties`:
```properties
sbt.version=1.3.10
```

## Sbt plugins
In the release and publication process, I will use `sbt-release` and `sbt-bintray`. So the content of my `project/plugins.sbt` file is:
```sbt
addSbtPlugin("org.foundweekends" % "sbt-bintray" % "0.5.6")
addSbtPlugin("com.github.gseitz" % "sbt-release" % "1.0.13")
```

## Multimodule layout
The project will contain four submodules modules:
- `core`, `module1` and `module2` will be published.
- `moduleignored` will be ignored so not published.
  The `root` project will be not published as well.

```text
.
├── build.sbt
├── core
│   └── src
│       └── main
│           └── scala
│               └── com
│                   └── example
│                       └── Hello.scala
├── LICENSE.md
├── module1
│   └── src
│       └── main
│           └── scala
│               └── com
│                   └── example
│                       └── Hello.scala
├── module2
│   └── src
│       └── main
│           └── scala
│               └── com
│                   └── example
│                       └── Hello.scala
├── moduleignored
│   └── src
│       └── main
│           └── scala
│               └── com
│                   └── example
│                       └── Hello.scala
├── project
│   ├── build.properties
│   ├── plugins.sbt
│   └── project
├── README.md
└── version.sbt

```

## crossScalaVersions
This will allow to release the same library for different Scala version at the same time.

In the example, I'm using the same subset of scala versions in all projects, but it is possible to specify it per module as well.
In my example:
```sbt
lazy val scala213 = "2.13.2"
lazy val scala212 = "2.12.11"
lazy val scala211 = "2.11.12"
lazy val scala210 = "2.10.7"
lazy val supportedScalaVersions = List(scala213, scala212, scala211, scala210)

crossScalaVersions := supportedScalaVersions // Same set of version in every module.
```

## sbt-bintray configuration
For sbt publishing, I will use two configurations, one for publish and another one for don't publishing:
```sbt
lazy val disablingPublishingSettings =
  Seq(skip in publish := true, publishArtifact := false)

lazy val enablingPublishingSettings = Seq(
  publishArtifact := true, // Enable publish
  publishMavenStyle := true,
  // http://www.scala-sbt.org/0.12.2/docs/Detailed-Topics/Artifacts.html
  publishArtifact in Test := false,
  // Bintray
  bintrayPackageLabels := Seq("scala", "sbt"),
  bintrayRepository := "maven",
  bintrayVcsUrl := Some("https://github.com/angelcervera/sbt-multimodule-template.git"),
//  bintrayReleaseOnPublish := false, To enable staging
//  bintrayRelease := false
)
```

We will import one setting depending on if we want to publish or ignore publication. For example:
```sbt
lazy val module2 = (project in file("module2"))
  .settings(
    commonSettings,
    enablingPublishingSettings,
    name := "submodule2",
    description := "Submodule 2 published",
    bintrayPackage := "multimodule-submodule-2",
  )

lazy val moduleIgnored = (project in file("moduleignored"))
  .settings(commonSettings, disablingPublishingSettings)
```

Other important step is to set your credential. You can [do it on different ways](https://github.com/sbt/sbt-bintray#credentials):
Using environment variables, Jvm properties or credentials file. In the example, I'm using the last one. The credentials
file is located at `~/.bintray/.credentials` and the format is:
```properties
realm = Bintray API Realm
host = api.bintray.com
user = <insert-your-username-here>
password = <insert-your-key-here>
```

## sbt-release configuration
The `root project` will define the release process.

We cannot use the default configuration because it doesn't work in `crossScalaVersions` projects. The difference is the
in lines *14* and *18*, where I force cross scala versions execution for `test` and `publish` command with `+`.

```sbt
lazy val root = (project in file("."))
  .aggregate(core, module1, module2, moduleIgnored)
  .settings(
    name := "sbt-multimodule-template",
    // crossScalaVersions must be set to Nil on the aggregating project
    crossScalaVersions := Nil,
    publish / skip := true,
    // don't use sbt-release's cross facility
    releaseCrossBuild := false,
    releaseProcess := Seq[ReleaseStep](
      checkSnapshotDependencies,
      inquireVersions,
      runClean,
      releaseStepCommandAndRemaining("+test"),
      setReleaseVersion,
      commitReleaseVersion,
      tagRelease,
      releaseStepCommandAndRemaining("+publish"),
      setNextVersion,
      commitNextVersion,
      pushChanges
    )
  )
```

Other important part is the `version.sbt` file. Because the `sbt-release` plugin can not modify the `build.sbt` file, this
external file stores the current version.
```sbt
version in ThisBuild := "1.42-SNAPSHOT"
```

> Recommendation: Keep in the master the current SNAPSHOT in development, and a tag per release.

## Release and publish in one command
To generate a release, as usual:

```shell script
sbt release
```

After the process, we will have:
- new release of the current SNAPSHOT and a new tag. For example, from 1.0-SNAPTSHOT to v1.0
- Increase the current SNAPSHOT
- Generate one artifact per module and Scala version.
- Publish all artifacts in Bintray.


## References and resources
- [Github with the project used as example](https://github.com/angelcervera/sbt-multimodule-template)
- [Bintray](https://bintray.com)
- [SBT documentation / Publishing](https://www.scala-sbt.org/1.x/docs/Publishing.html)
- [SBT documentation / Cross building](https://www.scala-sbt.org/1.x/docs/Cross-Build.html)
- [SBT documentation / Cross building plugin](https://www.scala-sbt.org/release/docs/Cross-Build-Plugins.html)
- [Github sbt-bintray repo](https://github.com/sbt/sbt-bintray)
- [Github sbt-release repo](https://github.com/sbt/sbt-release)
