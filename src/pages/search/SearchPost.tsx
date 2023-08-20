import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import SearchWindow from '../../components/searchWindow'
import SearchTab from '../../components/searchTab'
import { type LoadPost } from '../../types/postTypes'
import useSearch from './../../recoil/hooks/useSearch'
import useSSPagination from '../../hooks/useSSPagination'

interface SearchPostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPostArticle(
  props: SearchPostArticleProps
): JSX.Element {
  const { keyword, category } = useSearch()
  const [searchResult, setSearchResult] = useState<LoadPost[] | undefined>([])

  const { curPageItem, renderSSPagination } = useSSPagination<LoadPost>(
    `/search/${keyword.toLocaleLowerCase()}/${category.toLocaleLowerCase()}`,
    6
  )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem])

  return (
    <>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultTitle>
        <SearchResultKeyword>{keyword}</SearchResultKeyword>
        {keyword === ''
          ? `검색어를 입력하세요`
          : `와 관련된 게시글을 추천합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        {searchResult !== undefined
          ? searchResult.map((post, idx) => (
              <PostSmall key={idx} loadPost={post} />
            ))
          : null}
      </SearchResultGrid>
      {renderSSPagination()}
    </>
  )
}

const SearchResultTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 25px;
`

const SearchResultKeyword = styled.span`
  color: ${theme.colors.primaryColor};
`

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`
