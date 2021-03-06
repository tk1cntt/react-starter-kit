/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, canonicalUrl, imageUrl, styles, scripts, app, children } = this.props;
    const metaCanonicalUrl = [];
    if (canonicalUrl) {
      metaCanonicalUrl.push(
        <meta property="og:url" content={canonicalUrl} />,
      );
      metaCanonicalUrl.push(
        <link rel="canonical" href={canonicalUrl} />,
      );
    }
    const metaImageUrl = [];
    if (imageUrl) {
      metaImageUrl.push(
        <meta property="og:image" content={imageUrl} />,
      );
      metaImageUrl.push(
        <meta name="twitter:image" content={imageUrl} />,
      );
      metaImageUrl.push(
        <meta name="og:image:width" content="170" />,
      );
      metaImageUrl.push(
        <meta name="og:image:height" content="170" />,
      );
    }
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
          <meta property="fb:app_id" content="743549422677962" />
          <meta property="og:site_name" content="Bất động sản TinVang" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="article:publisher" content="https://www.facebook.com/bdstinvang" />
          <meta property="article:section" content="Facebook" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@bdstinvang" />
          <meta name="twitter:creator" content="@bdstinvang" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {metaCanonicalUrl}
          {metaImageUrl}
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body>
          <noscript id="deferred-styles">
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/antd-mobile/2.2.2/antd-mobile.min.css"
            />
          </noscript>
          <script
            dangerouslySetInnerHTML={{
              __html: `var loadDeferredStyles = function () {
                  var addStylesNode = document.getElementById("deferred-styles");
                  var replacement = document.createElement("div");
                  replacement.innerHTML = addStylesNode.textContent;
                  document.body.appendChild(replacement)
                  addStylesNode.parentElement.removeChild(addStylesNode);
              };
              var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
              if (raf) raf(function () { window.setTimeout(loadDeferredStyles, 0); });
              else window.addEventListener('load', loadDeferredStyles);`,
            }}
          />
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${
                    config.analytics.googleTrackingId
                  }','auto');ga('send','pageview')`,
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
        </body>
      </html>
    );
  }
}

export default Html;
