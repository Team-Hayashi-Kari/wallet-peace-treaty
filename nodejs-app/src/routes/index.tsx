/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Flex, Heading, HStack, Image, VStack } from '@yamada-ui/react'
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
  })
}

const titleStyle = css({
	background: "linear-gradient(45deg,rgba(255, 201, 115, 1) 0%, rgba(255, 125, 41, 1) 100%)"
})

function TopPage() {
  return (
    <Box>
			<HStack p="lg" height={'100vh'} justifyContent={'space-evenly'} css={titleStyle}>
				<VStack color={'white'} textAlign={'center'} p="lg" alignItems="center" width="fit-content">
					<Heading as={'h1'}>お財布平和条約</Heading>
					<Box whiteSpace={'nowrap'}>割り勘、後から清算するのをスムーズに</Box>
					<Button variant="outline" colorScheme="orange" >割り勘を始める</Button>
				</VStack>
				<Image src='https://soco-st.com/wp-content/themes/socost/upload/8194_line.svg' boxSize='lg' minBoxSize='sm' alt="SVG Image" fallback="https://placehold.co/384" display={{ base: 'block', md: 'none' }} />
			</HStack>
			{/* 説明部分 */}
      <div css={styles.explanation}>
        <h2>みんなとご飯を食べたとき、割り勘するの大変じゃないですか？</h2>
        <h2>そんな悩み、解決します</h2>
      </div>
      <p css={styles.readTheDocs}>
        {/* Click on the Vite and React logos to learn more */}
      </p>
    </Box>
  )
}
