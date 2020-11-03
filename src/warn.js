/**
 * Warn Script
 *
 * Override Mavenlink's input field placeholders and background value as a reminder to
 * double check the public/private input option when posting.
 *
 * Add links to each post to enable sharing of posts externally.
 *
 * TODO - implement change detection rather than looped timer
 * TODO - update btn styles when public
 * TODO - break up codebase into functions
 * TODO - implement user options and move script variables to user options
 * TODO - implement hyperlink on posts
 */

console.log("🦍 warnscript active 🦍");

// Script variables
const loopTime = 3000;
const warnColour = "#fff8f8";
const warnText = "🤠👆";

// Constants and DOM match values
const dataPostId = "data-post-id";
const listOfEvents = "list-of-events";
const messageWrapperClass = "message-wrapper";
const placeholderAttributeName = "placeholder";
const privacyClass = "privacy";
const publicTextValue = " Public";
const showPostParam = "?show_post";
const textAreaElement = "TextArea";

// Flags
let isFirstIteration = true;

// DOM retrieved vars
let existingPlaceholder = undefined;

/**
 * Add hyperlinks to page posts
 */
const linkPosts = () => {
    // Match workspace url with regex, ignore any extra url parameters
    const urlRegex = /https:\/\/.*workspaces\/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;
    const regexResults = urlRegex.exec(document.URL);

    // Guard page mismatch (non-workspace page)
    if (!regexResults || !regexResults.length) {
        return;
    }

    // Take url from regex result
    const cleanUrl = regexResults[0];

    // Retrieve list of posts
    const eventContainer = document.getElementById(listOfEvents);

    // Check for and loop through posts
    if (eventContainer && eventContainer.children) {
        const eventList = eventContainer.children[0];
        for (const event of eventList.children) {
            // If event is post event and has an id
            const postId = event.getAttribute(dataPostId);
            if (postId) {
                // Build link url
                const postLink = cleanUrl + showPostParam + postId;
                // todo add link to post
                console.log(postLink);
            }
        }
    }
}

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
linkPosts();