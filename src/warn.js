/**
 * Warn Script
 *
 * Override Mavenlink's input field placeholders and background value as a reminder to
 * double check the public/private input option when posting.
 *
 * The following extension is intended for James Dennis only. it'sfreerealestate.
 *
 * TODO - implement change detection rather than looped timer
 * TODO - update btn styles when public
 * TODO - break up codebase into functions
 * TODO - implement user options and move script variables to user options
 */

console.log("🦍 warnscript active 🦍");

// Script variables
const loopTime = 3000;
const warnColour = "#fff8f8";
const warnText = "🤠👆";

// Constants and DOM match values
const messageWrapperClass = "message-wrapper";
const placeholderAttributeName = "placeholder";
const privacyClass = "privacy";
const publicTextValue = " Public";
const textAreaElement = "TextArea";

// Flags
let isFirstIteration = true;

// DOM retrieved vars
let existingPlaceholder = undefined;

/**
 * Recursive function to monitor page, match and override input attributes
 */
const monitorPage = () => {
    // Retrieve all post input wrappers on page
    const postWrappers = document.getElementsByClassName(messageWrapperClass);

    // Loop through retrieved post wrappers, check post status and update field if required
    for (const postWrapper of postWrappers) {
        // Retrieve required elements
        const textArea = postWrapper.getElementsByTagName(textAreaElement)[0];
        const privacyDiv = postWrapper.getElementsByClassName(privacyClass)[0];

        // Assign existing input placeholder on first iteration of function
        if (isFirstIteration) {
            existingPlaceholder = textArea.placeholder;
            isFirstIteration = false;
        }

        // Detect private or public status of post and update attributes accordingly
        if (privacyDiv.innerText === publicTextValue) {
            // textArea.setAttribute('style', `background: ${warnColour};`); // Update input background colour with warning colour
            textArea.setAttribute(placeholderAttributeName, `${warnText} ${existingPlaceholder}`);
        } else {
            textArea.setAttribute(placeholderAttributeName, existingPlaceholder);
        }
    }

    // Loop this function
    setTimeout(() => {
        monitorPage();
    }, loopTime);
};

monitorPage();