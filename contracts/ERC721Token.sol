pragma solidity ^0.4.23;

import "./ERC721.sol";
import "./ERC721BasicToken.sol";


/**
 * @title Full ERC721 Token
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract ERC721Token is ERC721, ERC721BasicToken {
  address private contractManager;

  // Token name
  string internal name_;

  // Token symbol
  string internal symbol_;

  // Mapping from owner to list of owned token IDs
  mapping(address => uint256[]) internal ownedTokens;

  // Mapping from token ID to index of the owner tokens list
  mapping(uint256 => uint256) internal ownedTokensIndex;

  // Array with all token ids, used for enumeration
  uint256[] internal allTokens;

  // Mapping from token id to position in the allTokens array
  mapping(uint256 => uint256) internal allTokensIndex;

  // Optional mapping for token URIs
  mapping(uint256 => string) internal tokenURIs;

  uint8 denomination;
  //tokenId - CoinStructure
  mapping (uint256 => CoinMetaInfo) public metaInfos;
    //countryId -> Country
    mapping (uint256 => Country) public countries;
    //regionId -> Region
    mapping (uint256 => Region) public regions;
    //cityId -> Cities
    mapping (uint256 => City) public cities;
    //cityId -> ownedTokensId
    mapping (uint256 => uint256[]) public ownedCities;

    struct CoinMetaInfo {
        uint256 tokenId;
        string serialNumber;
        uint8 denomination;
        string cityName;
        string image;
        //for new structure
        uint256 cityId;
    }

    struct Country {
        uint256 countryId;
        string countryName;
        string image;
        //Region[] regions;
        uint256[] regionIds;
        //helpers
        bool isCreated;
    }

    struct Region {
        uint256 regionId;
        uint256 countryId;
        string regionName;
        string image;
        //City[] cities;
        uint256[] cityIds;
        //helpers
        bool isCreated;
    }

    struct City {
        uint256 cityId;
        uint256 regionId;
        string cityName;
        string image;
        uint256 maxLimit;
        //helpers
        bool isCreated;
    }

    function createCountry(uint256 _countryId, string _countryName, string _image) public onlyContractManager {
        Country storage country = countries[_countryId];

        if(country.isCreated){
            revert();
        }

        country.countryId = _countryId;
        country.countryName = _countryName;
        country.image = _image;
        country.isCreated = true;
    }

    function createRegion(uint256 _countryId, uint256 _regionId, string _regionName, string _image) public onlyContractManager {
        Country storage country = countries[_countryId];
        if(!country.isCreated){//country doesn't exist
            revert();
        }
        Region storage region = regions[_regionId];
        if(region.isCreated){
            revert();
        }

        region.regionId = _regionId;
        region.countryId = _countryId;
        region.regionName = _regionName;
        region.image = _image;
        region.isCreated = true;

        //assign region to country
        //country.regions.push(region);
        country.regionIds.push(_regionId);
    }

    function createCity(uint256 _regionId, uint256 _cityId, string _cityName, string _image, uint256 _maxLimit) public onlyContractManager {
        Region storage region = regions[_regionId];
        if(!region.isCreated){
            revert();
        }

        City storage city = cities[_cityId];
        if(city.isCreated){
            revert();
        }

        city.cityId = _cityId;
        city.regionId = _regionId;
        city.cityName = _cityName;
        city.image = _image;
        city.maxLimit = _maxLimit;
        city.isCreated = true;

        //assign city to region
        //region.cities.push(city);
        region.cityIds.push(_cityId);
    }

  /**
   * @dev Constructor function
   */
  //todo: unlock in release
  //constructor(string _name, string _symbol, uint8 _denomination) public {
  constructor() public {
    //todo: unlock in release
  //  name_ = _name;
  //  symbol_ = _symbol;
  //  denomination = _denomination;
    name_ = "Questukas";
    symbol_ = "QST";
    denomination = 5;
    contractManager = msg.sender;
  }

  /* Change contract manager */
  function changeContractManager (address _newContractManager) public onlyContractManager {
    if (_newContractManager != contractManager) {
      contractManager = _newContractManager;
    } else {
      revert();
    }
  }

    function getRegions(uint256 _countryId) public constant returns (uint256[]){
        return countries[_countryId].regionIds;
    }

    function getCities(uint256 _cityId) public constant returns (uint256[]){
        return regions[_cityId].cityIds;
    }

    function getOwnedTokens(address _address) public constant returns (uint256[]){
        return ownedTokens[_address];
    }
  /**
 *
 * permission checker
 */
  modifier onlyContractManager() {
    if(msg.sender != contractManager){
      revert();
    }
    _;
  }

  /**
   * @dev Gets the token name
   * @return string representing the token name
   */
  function name() public view returns (string) {
    return name_;
  }

  /**
   * @dev Gets the token symbol
   * @return string representing the token symbol
   */
  function symbol() public view returns (string) {
    return symbol_;
  }

  /**
   * @dev Returns an URI for a given token ID
   * @dev Throws if the token ID does not exist. May return an empty string.
   * @param _tokenId uint256 ID of the token to query
   */
  function tokenURI(uint256 _tokenId) public view returns (string) {
    require(exists(_tokenId));
    return tokenURIs[_tokenId];
  }

  /**
   * @dev Gets the token ID at a given index of the tokens list of the requested owner
   * @param _owner address owning the tokens list to be accessed
   * @param _index uint256 representing the index to be accessed of the requested tokens list
   * @return uint256 token ID at the given index of the tokens list owned by the requested address
   */
  function tokenOfOwnerByIndex(
    address _owner,
    uint256 _index
  )
    public
    view
    returns (uint256)
  {
    require(_index < balanceOf(_owner));
    return ownedTokens[_owner][_index];
  }

  /**
   * @dev Gets the total amount of tokens stored by the contract
   * @return uint256 representing the total amount of tokens
   */
  function totalSupply() public view returns (uint256) {
    return allTokens.length;
  }

  /**
   * @dev Gets the token ID at a given index of all the tokens in this contract
   * @dev Reverts if the index is greater or equal to the total number of tokens
   * @param _index uint256 representing the index to be accessed of the tokens list
   * @return uint256 token ID at the given index of the tokens list
   */
  function tokenByIndex(uint256 _index) public view returns (uint256) {
    require(_index < totalSupply());
    return allTokens[_index];
  }

  /**
   * @dev Internal function to set the token URI for a given token
   * @dev Reverts if the token ID does not exist
   * @param _tokenId uint256 ID of the token to set its URI
   * @param _uri string URI to assign
   */
  function setTokenURI(uint256 _tokenId, string _uri) public onlyContractManager {
    require(exists(_tokenId));
    tokenURIs[_tokenId] = _uri;
  }

  /**
   * @dev Internal function to add a token ID to the list of a given address
   * @param _to address representing the new owner of the given token ID
   * @param _tokenId uint256 ID of the token to be added to the tokens list of the given address
   */
  function addTokenTo(address _to, uint256 _tokenId) internal {
    super.addTokenTo(_to, _tokenId);
    uint256 length = ownedTokens[_to].length;
    ownedTokens[_to].push(_tokenId);
    ownedTokensIndex[_tokenId] = length;
  }

  /**
   * @dev Internal function to remove a token ID from the list of a given address
   * @param _from address representing the previous owner of the given token ID
   * @param _tokenId uint256 ID of the token to be removed from the tokens list of the given address
   */
  function removeTokenFrom(address _from, uint256 _tokenId) internal {
    super.removeTokenFrom(_from, _tokenId);

    uint256 tokenIndex = ownedTokensIndex[_tokenId];
    uint256 lastTokenIndex = ownedTokens[_from].length.sub(1);
    uint256 lastToken = ownedTokens[_from][lastTokenIndex];

    ownedTokens[_from][tokenIndex] = lastToken;
    ownedTokens[_from][lastTokenIndex] = 0;
    // Note that this will handle single-element arrays. In that case, both tokenIndex and lastTokenIndex are going to
    // be zero. Then we can make sure that we will remove _tokenId from the ownedTokens list since we are first swapping
    // the lastToken to the first position, and then dropping the element placed in the last position of the list

    ownedTokens[_from].length--;
    ownedTokensIndex[_tokenId] = 0;
    ownedTokensIndex[lastToken] = tokenIndex;
  }

  /**
   * @dev Internal function to mint a new token
   * @dev Reverts if the given token ID already exists
   * @param _to address the beneficiary that will own the minted token
   * @param _tokenId uint256 ID of the token to be minted by the msg.sender
   */
  function mint(address _to, uint256 _tokenId, string _serialNumber, string _cityName, string _image) public onlyContractManager {
    super._mint(_to, _tokenId);

    allTokensIndex[_tokenId] = allTokens.length;
    allTokens.push(_tokenId);

    //our

    CoinMetaInfo storage coinInfo = metaInfos[_tokenId];
    coinInfo.tokenId = _tokenId;
    coinInfo.serialNumber = _serialNumber;
    coinInfo.denomination = denomination;
    coinInfo.cityName = _cityName;
    coinInfo.image = _image;
  }

    function mint2(address _to, uint256 _tokenId, string _serialNumber, uint256 _cityId) public onlyContractManager {
        super._mint(_to, _tokenId);

        allTokensIndex[_tokenId] = allTokens.length;
        allTokens.push(_tokenId);

        City storage city = cities[_cityId];
        if(!city.isCreated){
            revert();
        }
        //check limit
        uint256[] storage cityOwners = ownedCities[_cityId];
        if(cityOwners.length >= city.maxLimit){
            revert();
        }

        CoinMetaInfo storage coinInfo = metaInfos[_tokenId];
        coinInfo.tokenId = _tokenId;
        coinInfo.serialNumber = _serialNumber;
        coinInfo.denomination = denomination;
        coinInfo.cityName = city.cityName;
        coinInfo.image = city.image;
        coinInfo.cityId = _cityId;

        cityOwners.push(_tokenId);
    }
  /**
   * @dev Internal function to burn a specific token
   * @dev Reverts if the token does not exist
   * @param _owner owner of the token to burn
   * @param _tokenId uint256 ID of the token being burned by the msg.sender
   */
  function burn(address _owner, uint256 _tokenId) public onlyContractManager {
    super._burn(_owner, _tokenId);

    // Clear metadata (if any)
    if (bytes(tokenURIs[_tokenId]).length != 0) {
      delete tokenURIs[_tokenId];
    }

    // Reorg all tokens array
    uint256 tokenIndex = allTokensIndex[_tokenId];
    uint256 lastTokenIndex = allTokens.length.sub(1);
    uint256 lastToken = allTokens[lastTokenIndex];

    allTokens[tokenIndex] = lastToken;
    allTokens[lastTokenIndex] = 0;

    allTokens.length--;
    allTokensIndex[_tokenId] = 0;
    allTokensIndex[lastToken] = tokenIndex;
  }

}
