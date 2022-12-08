
export const acviteLink = (astroPath: string, itemPath: string): boolean => {

    const isHash: boolean = itemPath.includes("#")
  
    if (isHash) {

        const hash: string[] = itemPath.split("/").filter(_hash => _hash.includes("#").valueOf())

        if (astroPath + hash === itemPath) return true

    }

    if (astroPath === itemPath) return true

};