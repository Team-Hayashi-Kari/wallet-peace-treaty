/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createFileRoute } from '@tanstack/react-router'
// import { Button } from '@yamada-ui/react';
// import { FontAwesomeIcon } from "@yamada-ui/fontawesome"
// import { faPoo } from "@fortawesome/free-solid-svg-icons"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

export const Route = createFileRoute('/')({
  component: TopPage,
})

const styles = {
  container: css({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  }),
  headingWrapper: css({
    background: 'linear-gradient(45deg, #FFC973, #FF7D29)', 
    marginBottom: '1rem',
    padding: '2rem',
    position: 'relative',
    minHeight: '500px',
    overflow: 'hidden',
  }),
  title: css({
    color: '#1a1a1a',
    fontSize: '3.5rem',
    position: 'absolute', 
    top: '35%',
    left: '100px',
    whiteSpace: 'nowrap',

    '@media (max-width: 768px)': { // 画面幅が768px以下の時に適用
      fontSize: '2.5rem', // フォントサイズを小さくする
      left: '50px', // 左からの位置も調整
      transform: 'translateX(0)', // 固定ピクセル値なのでtransformは不要になることが多い
      whiteSpace: 'normal', // 必要であれば折り返しを許可
    },
  }),
  subTitle: css({
    color: '#1a1a1a',
    fontSize: '1.2rem',
    position: 'absolute',
    top: '55%',
    left: '150px',
    textAlign: 'center',
    whiteSpace: 'nowrap',

    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
      top: '50%',
      left: '80px',
      whiteSpace: 'normal',
    },
  }),
  explanation: css({
    color: '#1a1a1a',
    fontSize: '0.9rem',
    position: 'absolute',
    left: '30px',

    '@media (max-width: 768px)': {
      fontSize: '0.55rem',
      left: '15px',
      whiteSpace: 'normal',
    },
  }),
  readTheDocs: css({
    color: '#1a1a1a',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '1rem', 
    '@media (max-width: 768px)': {
      fontSize: '0.55rem',
    },
  }),
  button: css({
    position: 'absolute',
    top: '55%',
    left: '150px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  })
}

function TopPage() {
  return (
    <>
      <div css={styles.headingWrapper}>
        <h1 css={styles.title}>お財布平和条約</h1>
        <h3 css={styles.subTitle}>割り勘をスムーズに行うツール</h3>

      {/* <div>
        <Button
          colorScheme="orange"
          size="lg"         
          variant="solid"   
          borderRadius="full"
          onClick={() => alert('割り勘を始めましょう！')}
          // その他のプロパティも多数あります
          // 例えば、width="200px" や isLoading={true} など
        >
          割り勘を始める
        </Button>
      </div> */}
        <div css={styles.button}>
          {/* <button css={styles.button} onClick={() => alert('割り勘を始めましょう！')}>
            割り勘を始める
          </button> */}
          {/* <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p> */}
        </div>
      </div>
      <div css={styles.explanation}>
        <h2>みんなとご飯を食べたとき、割り勘するの大変じゃないですか？</h2>
        <h2>そんな悩み、解決します</h2>
      </div>
      <p css={styles.readTheDocs}>
        {/* Click on the Vite and React logos to learn more */}
      </p>
    </>
  )
}
