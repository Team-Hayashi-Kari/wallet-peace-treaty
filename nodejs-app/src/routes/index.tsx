import { createFileRoute } from '@tanstack/react-router'
import { VStack, Box, Heading, Text } from "@yamada-ui/react"


export const Route = createFileRoute('/')({
  component: TopPage,
})


function TopPage() {
  return (
    <>
      <Box p="md" rounded="lg" bg="#FFFAF0" maxW="800px" mx="auto" shadow="lg">
        <VStack padding="xl" alignItems="center">
          {/* --- 各セクションの構造をVStackでラップ --- */}

          {/* おしながきセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack padding="xl" alignItems="center"> {/* 見出しと本文のグループをVStackでラップし、中央揃え */}
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
            <VStack padding="xl" alignItems="center"> {/* 同様にVStackでラップ */}
              <Heading size="xl" mb="md" color="warning.600">
                電卓モード
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" textAlign="left" px="md" my="0">
                自分が食べたものがいくらか計算したいあなたにはこのモード！<br/>
                電卓を複数展開することが出来て、タイトルをつけてメモできるようになっているよ！
              </Text>
            </VStack>
          </Box>

          {/* 後から精算モードセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <VStack padding="xl" alignItems="center"> {/* 同様にVStackでラップ */}
              <Heading size="xl" mb="md" color="warning.600">
                後から精算モード
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="2.2" margin="1" gap="8" textAlign="left" px="md" my="0">
                誰かが代理で払ってから割り勘したい時にはこのモード！<br/>
                誰がその商品を頼んで、いくら払えばいいのかを計算出来る！<br/>
                ユーザーを登録して商品を割り振ってみればあら不思議！<br/>
                一人いくら払えばいいかがパッと分かる！
              </Text>
            </VStack>
          </Box>

          {/* 最後のメッセージセクション */}
          <Box mb="lg" mx="auto" maxW="700px">
            <Text fontSize="2xl" color="warning.400" lineHeight="tall" textAlign="center" my="0">
              Let’s 快適な割り勘ライフを！
            </Text>
          </Box>
        </VStack>
      </Box> 
    </>
  )
}
