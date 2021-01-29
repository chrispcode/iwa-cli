import { replaceIwaContentRegex } from '../IwaContentReplacer';

export const divContent = 'window.env = {some: "object", something: "else"}';
export const divElement = `<script id="iwa">${divContent}</script>`;
export const indexHtml = (content = divContent) => `
<html>
  <head>
    <title>test</title>
  </head>
  <body>
    <div id="menu"></div>
    <div></div>
    <p>
      test
    </p>
    <script id="iwa">${content}</script>
    <div id="iwa2-some-other-id"></div>
  </body>
</html>
`;

export const getDivContent = (element = divElement) => {
  const match = element.match(replaceIwaContentRegex);
  if (match) {
    return match[0];
  }
  return undefined;
};
