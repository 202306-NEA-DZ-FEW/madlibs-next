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
  const array1 = rawStory
    .replaceAll(",", " ,")
    .replaceAll(".", " .")
    .split(" ");
  function FinalOutput(em) {
    if (em.endsWith("[n]") == true) {
      return { word: em.substring(0, em.length - 3), pos: "noun" };
    } else if (em.endsWith("[v]") == true) {
      return { word: em.substring(0, em.length - 3), pos: "verb" };
    } else if (em.endsWith("[a]") == true) {
      return { word: em.substring(0, em.length - 3), pos: "adjective" };
    } else {
      return { word: em };
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
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    // const joinedProcessedStory = processedStory.map(obj => `${obj.word} [${obj.pos}]`).join(" ");

    // const splitProcessedStory = splitArray(joinedProcessedStory, ".");
    // console.log(splitProcessedStory[0])
    // madLibsDom(splitProcessedStory[0])
    let array = [
      processedStory.slice(0, 28),
      processedStory.slice(28, 53),
      processedStory.slice(53, 111),
      processedStory.slice(111, 205),
    ];
    //console.log(array);
    for (let i = 0; i < array.length; i++) {
      madLibsDom(array[i], i);
    }
  });
let count = 0;

function madLibsDom(arrayOfWords, i) {
  //'editBox' and 'previewBox' are div elements where text is displayed.
  const editBox = document.querySelectorAll(".madLibsEdit")[i];
  const previewBox = document.querySelectorAll(".madLibsPreview")[i];

  const inputHolders = [
    "village name",
    "person's name",
    "put a verb",
    "positive impact",
    "intense",
    "age adjective",
    "what !",
    "put a verb",
    "put a verb",
    "dream",
    "give an adjective",
    "person's name",
    "put a noun",
    "path",
    "put a noun",
    "put a verb",
    "put a noun",
    "put a noun",
    "put a verb",
    "put a noun",
    "put a verb",
    "put a verb",
    "put a noun",
    "put a noun",
    "put a verb",
    "give an adjective",
    "village name",
    "put a noun",
    "give an adjective",
  ];

  // the count is used, to generate ids for inputs and their preview

  // Adding the story to the HTML
  for (const obj of arrayOfWords) {
    if (!obj.pos) {
      // creating simple words that don't have POS (not a verb, noun ,or adjective)
      const word = document.createElement("SPAN");
      word.classList.add("spann");
      word.textContent = obj.word;
      // the clone is needed to append same word into two parents otherwise it won't work
      const word2 = word.cloneNode(true);
      editBox.append(word);
      previewBox.append(word2);
    } else {
      // if POS exists that's mean this is either a noun ,verbe , or adjevtive
      // creating Inputs and adding eventListener at the end after appending
      const input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.setAttribute("id", "inpt" + count);
      input.setAttribute("maxlength", 20);
      input.classList.add("input");
      editBox.append(input);
      input.placeholder = inputHolders[count];
      input.addEventListener("keyup", () => {
        console.log("Input holder:", inputHolders[count]); // Log the corresponding placeholder
        sync(input.getAttribute("id"), input.value);
      });

      // this is the preview related to the inputs , when u change inputs in editBox the result appears here
      const span = document.createElement("SPAN");
      span.classList.add("spann", "pos");
      span.setAttribute("id", "spn" + count);
      span.setAttribute("value", `[${obj.pos}]`);
      span.textContent = `[${obj.pos}]`;
      previewBox.append(span);
      count++;
    }
  }
}

// the sync function is creating connection between inputs and preview (the previews are just HTML spans)
const sync = (id, val) => {
  console.log(id.replace(/\D/g, ""));
  const count = id.replace(/\D/g, "");
  document.getElementById("inpt" + count).innerHTML = val;
  document.getElementById("spn" + count).textContent = val;
};

// Input focus function
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputsF = document.querySelectorAll(".input");
    const focusInput = document.activeElement;

    if (inputsF.length > 1) {
      e.preventDefault();

      // Making array of inputs
      const currentIndex = Array.from(inputsF).indexOf(focusInput);
      const nextIndex = currentIndex + 1; // % inputsF.length; => If you want to loop it ie: return to the first input.

      // Move to the next input
      inputsF[nextIndex].focus();
    }
  }
});

// Reset function

const reset = () => {
  const inputs = document.querySelectorAll(".input");
  const previews = document.querySelectorAll(".pos");

  inputs.forEach((input, index) => {
    const prev = previews[index];
    console.log("inputtttt", input);
    input.value = "";
    prev.textContent = prev.getAttribute("value");
  });
};

document.getElementById("reset").addEventListener("click", reset);
