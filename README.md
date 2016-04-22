# MultiLang Test Course

## Setup
    - grunt build
    - grunt server
    
## Design Feedback:
Languagepicker View for initial selection very bare bone, Each Language is just a button. Each Button gets a lang-class, could be used to add Flag icons.

Flow of "changing the Language in a Course"
- icon in the Navigationbar
- Supported Languages in the Drawer
- Notify Confirm to change Language and informs about resetting the progress

Languages could also be listed in the Footer > Notify Confirm > Change Language

## Other Feedback
Progress:
- Language change during a course resets course completion
- Status reset to "incomplete"
- Score set to "undefined"

Assessment:
- AssessmentID's are unique (prefixed with lang-code)
- Stored in offlinestorage
- State can be restored, so number of attempts for each language can be tracked
