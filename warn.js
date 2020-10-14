/**
 * Warn Script
 *
 * Override Mavenlink's input field placeholders and background value as a reminder to
 * double check the public/private input option when posting.
 *
 * The following extension is intended for James Dennis only. it'sfreerealestate.
 *
 * TODO - detect public/private status of post, clear styles on private posts
 * TODO - implement change detection rather than looped timer
 * TODO - update btn styles
 * TODO - add icon
 * TODO - build extension - build and src folder
 */

console.log("🦍 warnscript active 🦍");

const loopTime = 3000;
const newPlaceholder = "🤠👆 Create new post...";
const overrideElementClasses = "markdown_markdown-area__3s11P focus-target markdown-textarea sections_resizable__3HLQS sections_text-content__16ZYh";
const warnColour = "#fff8f8";

// Match full post input wrappers
// const messageWrappers = document.getElementsByClassName("message-wrapper");

/**
 * Recursive function to monitor page, match and override input attributes
 */
const monitorPage = () => {
    // Match Mavenlink input fields
    const postFields = document.getElementsByClassName(overrideElementClasses);

    // Update attributes of input fields
    if (postFields && postFields.length) {
        for (const postField of postFields) {
            // postField.setAttribute('style', `background: ${warnColour};`);
            postField.setAttribute('placeholder', newPlaceholder);
        }
    }

    setTimeout(() => {
        monitorPage();
    }, loopTime);
};

monitorPage();