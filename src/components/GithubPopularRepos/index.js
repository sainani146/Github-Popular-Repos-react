import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
export default class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    activeLanguage: languageFiltersData[0].id,
    repositoryList: [],
    connection: false,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    try {
      const {activeLanguage} = this.state
      const options = {
        method: 'GET',
      }
      const response = await fetch(
        `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`,
        options,
      )
      const fetchedData = await response.json()

      const updatedData = await fetchedData.popular_repos.map(
        eachRepository => ({
          id: eachRepository.id,
          imageUrl: eachRepository.avatar_url,
          name: eachRepository.name,
          starsCount: eachRepository.stars_count,
          forksCount: eachRepository.forks_count,
          issuesCount: eachRepository.issues_count,
        }),
      )

      console.log(updatedData)
      this.setState({repositoryList: updatedData, isLoading: false})
    } catch (error) {
      console.log(error)
      this.setState({isLoading: false, connection: true})
    }
  }

  renderFailed = () => (
    <div className="failure-section">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderRepositoriesList = () => {
    const {repositoryList} = this.state

    return (
      <ul className="repositories-cards-list-container">
        {repositoryList.map(repositoryData => (
          <RepositoryItem
            key={repositoryData.id}
            repositoryData={repositoryData}
          />
        ))}
      </ul>
    )
  }

  selectedLanguage = lang => {
    this.setState({activeLanguage: lang, isLoading: true}, this.getItems)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading, activeLanguage, connection} = this.state

    return (
      <div className="main-container">
        <h1 className="main-title">Popular</h1>
        <ul className="ul">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              isSelected={each.id === activeLanguage}
              key={each.id}
              item={each}
              selectedLanguage={this.selectedLanguage}
            />
          ))}
        </ul>
        {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
        {connection && this.renderFailed()}
      </div>
    )
  }
}
