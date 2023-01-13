import { 
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  FormControl,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SearchPostQueryVariables } from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from './SearchBar.module.css';

interface Props {
  searchLoading?: boolean;
  marginTop?: string | undefined;
  onSearch?: (_str: SearchPostQueryVariables) => void;
  resetFilter?: ()=> void;
}

const SearchBar: React.FC <Props> = ({ onSearch, searchLoading, resetFilter, marginTop }) => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<SearchPostQueryVariables>();

  const handleSearchClick = (str: SearchPostQueryVariables) => {
    !!onSearch && onSearch(str);
  }

  const clearSearch = () => {
    reset();
    !!resetFilter && resetFilter();
  }

  const mt=  !!marginTop ? marginTop :'1em';

  return (
    <Flex w='100%' justifyContent='center' mb='2em' mt={mt}>
      <form className={styles.formWidth} onSubmit={handleSubmit(handleSearchClick)}>
        <FormControl mt={mt} w='100%' isInvalid={!!errors?.queryString}>
          <InputGroup size='md'>
            <Input
              {
              ...register('queryString',{
                  required: 'Search field is required.'
              })}
              id="queryString" 
              pr='4.5rem'
              type='text'
              borderRadius='20px'
              placeholder='Type here...'
            />
            <InputRightElement width='4.5rem'>
              { 
              !!searchLoading ? (
                <Spinner h='10px' w='10px' color='#c2a400' /> 
              )
              : (
                <Flex alignItems='center'>
                  <FontAwesomeIcon 
                      cursor='pointer'
                      icon={faTimes} 
                      onClick={clearSearch}
                      className={styles.clearSearch}
                    />
                  <FontAwesomeIcon 
                    cursor='pointer' 
                    icon={faSearch} 
                    onClick={()=>handleSubmit(handleSearchClick)()}
                  />
                </Flex>
              )
              }
            </InputRightElement>
          </InputGroup>
          {
            !!errors?.queryString && <FormErrorMessage>{errors.queryString.message}</FormErrorMessage>
          }
        </FormControl>
      </form>  
    </Flex>
  )
}

export default SearchBar