export function getReadingTime(content: any) {
  if (typeof content !== "string") {
    console.log(content);
    return 0;
  }
  const wordsPerMinute = 225;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}

export function getMonthAndDate(date: Date) {
  const firstThreeLettersOfMonth = date
    .toLocaleString("default", { month: "long" })
    .slice(0, 3);
  const day = date.getDate();
  return `${firstThreeLettersOfMonth} ${day}`;
}
