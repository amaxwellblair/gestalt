// @flow
import React from 'react';
import { card, md } from 'corkboard';
import { ns, stylesTable } from '../../../.corkboard/cards';

ns('Borders');

type Props = {border: string, hasFill?: boolean}

function Swatch({ border, hasFill }: Props) {
  return (
    <div className="flex flex-column items-center center">
      <div
        className={border}
        style={{
          width: '6rem',
          height: '6rem',
          backgroundColor: (hasFill ? '#efefef' : 'transparent'),
        }}
      />
      <div className="h6 py1 dark-gray text-center">
        <code className="text-s">{border}</code>
      </div>
    </div>
  );
}

const borderLines = [
  'border',
  'border-top',
  'border-bottom',
  'border-left',
  'border-right',
  'no-border',
];

card('Lines',
  md`
Adds those pretty lines that everybody likes.

\`\`\`html
<div class="border">border</div>
<div class="border-top">border-top</div>
<div class="border-bottom">border-bottom</div>
<div class="border-right">border-right</div>
<div class="border-left">border-left</div>
<div class="no-border">no-border</div>
\`\`\`
 `,
  <div className="flex mxn1 justify-center flex-wrap">
    {borderLines.map((border, i) =>
      <div className="mx1 col-3 mb2" key={i}>
        <Swatch border={border} />
      </div>
    )}
  </div>);

const borderRadii = [
  'circle',
  'rounded',
  'rounded-top',
  'rounded-bottom',
  'rounded-right',
  'rounded-left',
];

card('Border Radii',
  md`
Adds those pretty border radiuses.

\`\`\`html
<div class="circle"> .circle </div>
<div class="rounded"> .rounded </div>
<div class="rounded-top"> .rounded-top </div>
<div class="rounded-bottom"> .rounded-bottom </div>
<div class="rounded-right"> .rounded-right </div>
<div class="rounded-left"> .rounded-left </div>
\`\`\`
  `,
  <div className="flex mxn1 justify-center flex-wrap">
    {borderRadii.map((border, i) =>
      <div className="mx1 col-3 mb2" key={i}>
        <Swatch border={border} hasFill />
      </div>
    )}
  </div>);

stylesTable(
  require('!!raw!postcss!../Borders.css')
);
