# adapt-languagePicker  

## todo:
- ~~when changing language during a course page can't be reloaded (LMS)~~
  - ~~json must be fetched manually~~

- ~~language not always stored in offlineStorage~~
    ~~suspaenddata is not set before a value is read from offlinestorage~~

- reset Bookmarking
  - ~~navigate to #/~~
  - ~~check if this works with startcontroller~~
    - bug: when language changes during a course, navigates to #/ and not to specified page

- ~~accessibility~~
  - ~~not yet working for the languagePickerView when the course loads~~

- ~~handle completion~~
  - reset score --> "undefined"
  - reset status --> "incomplete"
  - assessment Object remains in offlineStorage, so state can be restored and attempts can be tracked
