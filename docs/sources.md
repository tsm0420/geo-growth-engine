# Primary sources

Reviewed on 2026-10-16. These sources inform checks; passing a check does not establish indexing, rankings, citations, or store acceptance.

| Check | Source and scope |
| --- | --- |
| Search versus training bots | [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot and GPTBot are independent controls. |
| Google AI discoverability | [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): ordinary search eligibility, Googlebot controls, and no required special AI text file or special schema. |
| Apple name and subtitle | [App Store Connect app information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/): name 2–30 characters; subtitle at most 30. |
| Apple description and keywords | [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/): description at most 4,000 characters; keywords at most 100 bytes. Apple's [marketing guidance](https://developer.apple.com/app-store/product-page/) describes keywords as 100 characters; the toolkit reports UTF-8 bytes and follows the stricter Connect reference. |
| Google Play listing text | [Create and set up your app](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en): title 30, short description 80, full description 4,000 characters. |
| HTML parsing | [Cheerio loading documents](https://cheerio.js.org/docs/basics/loading/). Parsing does not execute JavaScript or prove browser visibility. |
| YAML parsing | [yaml documentation](https://eemeli.org/yaml/). Parse errors and alias limits must remain operational errors. |
| XML parsing | [fast-xml-parser source and documentation](https://github.com/NaturalIntelligence/fast-xml-parser). XML well-formedness is distinct from sitemap coverage. |

Character checks count Unicode code points; UTF-8 bytes apply only to Apple's keyword field. Store-side validation and locale-specific behavior still require review in the relevant console. Product-fact sources supplied by a user are traceability references, not independently verified by the toolkit.
