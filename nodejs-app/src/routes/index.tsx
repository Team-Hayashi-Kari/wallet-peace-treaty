/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Heading, HStack, Image, VStack, Text } from '@yamada-ui/react'

export const Route = createFileRoute('/')({
  component: TopPage,
})

const titleStyle = css({
	background: "linear-gradient(45deg,rgba(255, 201, 115, 1) 0%, rgba(255, 125, 41, 1) 100%)"
})

function TopPage() {
  return (
    <>
    	<Box>
				<HStack p="lg" height={'100vh'} justifyContent={'space-evenly'} css={titleStyle}>
					<VStack color={'white'} textAlign={'center'} p="lg" alignItems="center" width="fit-content">
						<Heading as={'h1'}>お財布平和条約</Heading>
						<Box whiteSpace={'nowrap'}>割り勘、後から清算するのをスムーズに</Box>
						<HStack>
							<Button as='a' href='/calc' p='lx' variant="outline" colorScheme="orange" rounded='full' color='white'>マルチ電卓を開く</Button>
							<Button as='a' href='/settlement' p='lx' variant="outline" colorScheme="orange" rounded='full' color='white'>精密割り勘をする</Button>
						</HStack>
					</VStack>
					<Image src='https://soco-st.com/wp-content/themes/socost/upload/8194_line.svg' boxSize='lg' minBoxSize='sm' alt="SVG Image" fallback="https://placehold.co/384" display={{ base: 'block', md: 'none' }} />
				</HStack>
				{/* 説明部分 */}
    	</Box>
      <Box p={{base: 'lg', md: 'none'}} rounded="lg" bg="#FFFAF0" mx="auto" shadow="lg">
        <VStack alignItems="center">
          {/* --- 各セクションの構造をVStackでラップ --- */}

          {/* おしながきセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack alignItems="center"> {/* 見出しと本文のグループをVStackでラップし、中央揃え */}
              <Heading size="2xl" mb="md" color="warning.500"> {/* このHeadingはVStackのalignItems="center"で中央に */}
                おしながき
              </Heading>
              {/* Textコンポーネントにはpx="md"とmy="0"を維持しつつ、Boxの中では左揃え */}
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" textAlign="left" px="md" my="0">
                みんなでご飯を食べたとき、割り勘するの大変じゃないですか？<br/>
                そんな悩みを解決するためのツールです。<br/>
                このツールを使えば、割り勘をスムーズに行えて、割り勘のストレスがなくなるかも…？<br/>
                みんなで楽しくご飯を食べよう！
              </Text>
            </VStack>
          </Box>

          {/* 電卓モードセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack alignItems="center"> {/* 同様にVStackでラップ */}
              <Heading size="2xl" mb="md" color="warning.500">
                電卓モード
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" textAlign="left" px="md" my="0">
                自分が食べたものがいくらか計算したいあなたにはこのモード！<br/>
                電卓を複数展開することが出来て、タイトルをつけてメモできるようになっているよ！
              </Text>
							<Button as='a' href='/calc' p='lg' variant="outline" colorScheme="orange" rounded='full'>マルチ電卓を開く</Button>
            </VStack>
          </Box>

          {/* 後から精算モードセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack alignItems="center"> {/* 同様にVStackでラップ */}
              <Heading size="2xl" mb="md" color="warning.500">
                後から精算モード
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" gap="8" textAlign="left" px="md" my="0">
                誰かが代理で払ってから割り勘したい時にはこのモード！<br/>
                誰がその商品を頼んで、いくら払えばいいのかを計算出来る！<br/>
                ユーザーを登録して商品を割り振ってみればあら不思議！<br/>
                一人いくら払えばいいかがパッと分かる！
              </Text>
							<Button as='a' href='/settlement' p='lg' variant="outline" colorScheme="orange" rounded='full'>精密割り勘をする</Button>
            </VStack>
          </Box>

					{/* 支払い状況管理 */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack alignItems="center"> {/* 同様にVStackでラップ */}
              <Heading size="2xl" mb="md" color="warning.500">
                「あとで」モード
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" gap="8" textAlign="left" px="md" my="0">
                支払いを立て替えた後、誰からどの手段で返してもらう(返してもらった)かわからなくなることありませんか？<br/>
								そんなあなたにこのモード！<br/>
								名前や金額から日時、返金方法まで記録できます！
              </Text>
							<Button as='a' href='/result' p='lg' variant="outline" colorScheme="orange" rounded='full'>支払い状況管理をする</Button>
            </VStack>
          </Box>

          {/* 最後のメッセージセクション */}
          <Box mb="lg" mx="auto">
            <Text fontSize="2xl" color="warning.400" lineHeight="tall" textAlign="center" my="0">
              Let’s 快適な割り勘ライフを！
            </Text>
          </Box>
        </VStack>
      </Box> 
    </>
  )
}
