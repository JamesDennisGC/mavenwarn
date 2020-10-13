/**
 * Warn Script
 *
 * Override Mavenlink's input field placeholders and background value as a reminder to
 * double check the public/private input option when posting.
 *
 * The following extension is intended for James Dennis only. it'sfreerealestate.
 *
 * TODO - needs logic re-think, will not detect changes to page, cancelling a post clears styles.
 * TODO - implement change detection on public/private status of post, clear styles on private posts.
 */

console.log("🦍 warnscript active 🦍");

const warnColour = "#fff8f8";
const newPlaceholder = "🤠👆 Create new post...";
const overrideElementClasses = "markdown_markdown-area__3s11P focus-target markdown-textarea sections_resizable__3HLQS sections_text-content__16ZYh";

// Match full post input wrappers
// const messageWrappers = document.getElementsByClassName("message-wrapper");

// Arbitrary timeout to avoid load time issues
setTimeout(function(){
    // Match Mavenlink input fields
    const postFields = document.getElementsByClassName(overrideElementClasses);

    // Update attributes of input fields
    if (postFields && postFields.length) {
        for (const postField of postFields) {
            // postField.setAttribute('style', `background: ${warnColour};`);
            postField.setAttribute('placeholder', newPlaceholder);
        }
    }
}, 1000);