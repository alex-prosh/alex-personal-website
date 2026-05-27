import katex from 'katex'

interface Props { tex: string }

/** Inline math:  <M tex="\lambda_i" /> */
export function M({ tex }: Props) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, { throwOnError: false, output: 'html' }),
      }}
    />
  )
}

/** Display (block) math:  <MB tex="e^{At} = V e^{\Lambda t} V^{-1}" /> */
export function MB({ tex }: Props) {
  return (
    <div
      style={{ overflowX: 'auto', padding: '6px 0' }}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          throwOnError: false,
          displayMode: true,
          output: 'html',
        }),
      }}
    />
  )
}
