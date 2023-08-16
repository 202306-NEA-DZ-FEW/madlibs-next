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
let ObjectParssed =parseStory;

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */



getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});

// // const input = document.querySelector('madLibsEdit');
// //   console.log(input);
// //   ObjectParssed.map(function(em){
// //  if  ((em.pos)&& em.pos === 'noun'){
// //   const input = document.createElement('input');

// //  }
//   });
