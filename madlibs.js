/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
console.log(rawStory);
const array1 = rawStory.replaceAll("," , " ,").replaceAll(".", " .").split(" ");
function FinalOutput(em) {
  if (em.endsWith("[n]")==true) {
      return { word: em.substring(0, em.length - 3), pos: "noun" };
  }else if  (em.endsWith("[v]")==true){
    return { word: em.substring(0, em.length - 3), pos: "verb" };

  }else if (em.endsWith("[a]")==true){
return {word: em.substring(0, em.length - 3), pos: "adjective" }
  }else{

    return {word:em };
  }
}
const parsedStory = array1.map(FinalOutput);
return parsedStory;
//console.log(parsedStory);
}


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});


// DOM 

function functionality(arrayOfWords) {
  const resetBtn = document.querySelectorAll("button")[0]

  //'editBox' and 'previewBox' are div elements where text is displayed.
  const editBox = document.querySelectorAll(".editBox")[0];
  const previewBox = document.querySelectorAll(".previewBox")[0];

  //i took three inputs just to test we can add more later
  const inputIds = ["0input-1", "1input-2", "2input-3"];

  //the 'arrayOfBlanks' is set to store the user's input values for the blanks.
  const arrayOfBlanks = []

  /**
   * 'Bella' is a young individual with no clear direction in life. However, their fervor for technology and webdev burned brightly within them. 
   * One fateful day, an opportunity of a lifetime 'knocked' on their virtual door : an invitation to, an online 'bootcamp'.
   */
  const inputHolders = [
    "Your&nbsp;name&nbsp;[n]",
    "Put&nbsp;a&nbsp;verb&nbsp;[v]",
    "The&nbsp;name&nbsp;of&nbsp;theworkshop&nbsp;[n]",
  ];

  let count = 0;

  // Adding the story to the HTML
   for (const obj of arrayOfWords) {
      if (/\.\.\./.test(obj.word) !== true) {
        editBox.innerHTML += `${obj.word} &nbsp;`;
        previewBox.innerHTML += `${obj.word}  &nbsp;`;
      } else {
        editBox.innerHTML += `<input id = ${inputIds[count]} class="editable" type="text" placeholder=${inputHolders[count]} maxlength="20" autocomplete="off">`
        previewBox.innerHTML += `<span class= ${inputIds[count]} class="readonly">[${obj.pos}] </span>`
        count += 1
        arrayOfBlanks.push(obj)
      }
    } }
