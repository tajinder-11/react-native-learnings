import React from 'react';

function HtmlContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agora Video SDK Quickstart</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #ddeeff;
      padding: 20px;
    }
    .button {
      padding: 10px 20px;
      font-weight: bold;
      color: #ffffff;
      background-color: #0055cc;
      margin: 0 10px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .switch-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .switch-label {
      margin-right: 10px;
    }
    .video-container {
      width: 90%;
      margin-bottom: 20px;
    }
    .video-view {
      width: 100%;
      height: 200px;
    }
    .info {
      background-color: #ffffe0;
      padding: 8px;
      color: #0000ff;
    }
  </style>
</head>
<body>
  <h1>Agora Video SDK Quickstart</h1>
  <div id="btnContainer">
    <a href="#" class="button" id="joinBtn">Join channel</a>
    <a href="#" class="button" id="leaveBtn">Leave channel</a>
  </div>
  <div class="switch-container">
    <span class="switch-label">Audience</span>
    <input type="checkbox" id="hostSwitch" checked>
    <label for="hostSwitch">Host</label>
  </div>
  <div class="video-container" id="videoContainer"></div>
  <div id="message"></div>
  <script src="index.js" ></script>
</body>
</html>
`;
}
export default HtmlContent;
