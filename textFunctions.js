const likeCount = (text) => {
    let numOfLikes = 0
    const data = text.toLowerCase().split(' ')
    for(let i = 0; i < data.length; i++) {
       if(data[i].includes('like')) numOfLikes++
    }
    if(numOfLikes >= 3) {
      return `\u2022 You, like, have used the word like ${numOfLikes} times in this text. \n`
    } else return ""
  }

const tooManyExclamationPoints = (text) => {
    let numOfExclamation = 0
    const amountOfWords = text.split(' ').length
    for(let i = 0; i < text.length; i++) {
      if(text[i] === '!') numOfExclamation++  
    }
    if(numOfExclamation >= amountOfWords - 1 && numOfExclamation >= 3) {
      return "\u2022 Wow! you have used almost as many exclamation points as there are words in that text. Are you really that excited? \n"
    } else return ""
  } 
  


const shortenText = (text) => {
    if(text.length >= 60) text = text.slice(0, 60)
    text = text.slice(0, text.lastIndexOf(" "))
    text = text + "..."
    return text
  }

const adviceGenerator = (text, results) => {
    let adjectiveMood = "a "
    let lovehate = ""
    if(results.percent >= 90) adjectiveMood = "a very "
    else if ( results.percent <= 50 ) adjectiveMood = "a somewhat "
    if(text.search("hate") > -1 && text.search("love") > -1){lovehate = "\u2022 Love and hate are strong words. Do you really mean it? \n"}
      else if(text.search("hate") > -1){lovehate = "\u2022 Hate is a bit of a strong word though, do you really mean it? \n"}
      else if(text.search("love") > -1){lovehate = "\u2022 Love is a bit of a strong word though, do you really mean it? \n"}
    let exclaim = this.tooManyExclamationPoints(text)
    let likelike = this.likeCount(text)
    return("\u2022 " + "This text has " + adjectiveMood + results.mood.toLowerCase() + " tone to it. \n" + lovehate + exclaim + likelike) 
  }

export default formatResults = (feedback, text) => {
    const percent = Math.floor(feedback * 100)
    const results = {}
    if (percent < 40) {
      results.mood = "NEGATIVE"
      results.color = "red"
      results.emojiColor = "#ff3333"
      results.percent = Math.floor(percent / 40 * 100)
      results.image = require("./public/negativeEmoji.png")
    } else if (percent > 40 && percent < 60) {
      results.mood = "NEUTRAL"
      results.color = "grey"
      results.emojiColor = "lightgrey"
      results.percent =  Math.floor(percent / 60 * 100)
      results.image = require("./public/neutralEmoji.png")
    } else {
      results.mood = "POSITIVE"
      results.color = "green"
      results.emojiColor = "lightgreen"
      results.percent =  Math.floor(percent)
      results.image = require("./public/positiveEmoji.png")
    }
  results.input  = shortenText(text)
  results.text = adviceGenerator(text, results)
  return results
}
