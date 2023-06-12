// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, selectedLanguage, isSelected} = props
  const {id, language} = item

  const btnClassName = isSelected ? 'btn selected-language-btn' : 'btn'

  const onClickBtnLanguageFilter = () => {
    console.log(id)
    selectedLanguage(id)
  }

  return (
    <li className="li">
      <button
        type="button"
        className={btnClassName}
        onClick={onClickBtnLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
