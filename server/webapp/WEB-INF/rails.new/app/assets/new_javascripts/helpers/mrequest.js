/*
 * Copyright 2016 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(['jquery'], function ($) {
  var setHeaders = function (xhr, version) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/vnd.go.cd." + version + "+json");
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    if (csrfToken) {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
  };

  return {
    xhrConfig: {
      v1: function (xhr) {
        setHeaders(xhr, 'v1');
      },
      v2: function (xhr) {
        setHeaders(xhr, 'v2');
      },
      v3: function (xhr) {
        setHeaders(xhr, 'v3');
      },
      v4: function (xhr) {
        setHeaders(xhr, 'v4');
      },
      forVersion: function(version){
        return function (xhr) {
          setHeaders(xhr, version);
        };
      }
    },

    unwrapErrorExtractMessage: function (data) {
      if (data.message) {
        return data.message;
      } else {
        return "There was an unknown error performing the operation";
      }
    }
  };
});

