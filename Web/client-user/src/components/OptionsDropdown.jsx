export default function OptionDropdown({category}){
  return(
    <>
    <option value={category.name}>{category.name}</option>
    </>
  )
}