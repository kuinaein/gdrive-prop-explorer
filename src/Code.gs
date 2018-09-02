'use strict';

/**
 * @see https://developers.google.com/apps-script/guides/web
 *
 * @return {!GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet() {
  var tmpl = HtmlService.createTemplateFromFile('index.html');
  return tmpl
    .evaluate()
    .setTitle('Google Drive Property Explorer')
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1, shrink-to-fit=no'
    );
}

/**
 * @param {?string} folderId
 * @return {!{folders: object[], files: object[]}}
 */
function listFiles(folderId) {
  var folder = folderId
    ? DriveApp.getFolderById(folderId)
    : DriveApp.getRootFolder();
  var ret = {
    folders: collectDriveResources(folder.getFolders()),
    files: collectDriveResources(folder.getFiles()),
  };
  return ret;
}

/**
 * @typedef {GoogleAppsScript.Drive.FolderIterator} FolderIterator
 * @typedef {GoogleAppsScript.Drive.FileIterator} FileIterator
 */

/**
 * ファイルまたはフォルダのイテレータから配列を作成する.
 * 削除済みフラグが立っているものは結果に含めない.
 *
 * @param {!(FolderIterator|FileIterator)} iter
 * @return {!Array<{id: string, name: string}>}
 */
function collectDriveResources(iter) {
  var resources = [];
  while (iter.hasNext()) {
    var res = iter.next();
    if (!res.isTrashed()) {
      resources.push({
        name: res.getName(),
        id: res.getId(),
      });
    }
  }
  return resources;
}

/**
 * @param {!string} fileId
 * @return {!Array}
 */
function listProperties(fileId) {
  return Drive.Properties.list(fileId).items;
}

/**
 * @param {!string} fileId
 * @param {!string} key
 * @param {!string} value
 */
function addProperty(fileId, key, value) {
  Drive.Properties.insert(
    {key: key, value: value, visibility: 'PUBLIC'},
    fileId
  );
}

/**
 * @param {!string} fileId
 * @param {!string} key
 * @param {!string} value
 */
function updateProperty(fileId, key, value) {
  Drive.Properties.update(
    {key: key, value: value, visibility: 'PUBLIC'},
    fileId,
    key,
    {visibility: 'PUBLIC'}
  );
}

/**
 * @param {!string} fileId
 * @param {!string} key
 */
function deleteProperty(fileId, key) {
  Drive.Properties.remove(fileId, key, {visibility: 'PUBLIC'});
}
