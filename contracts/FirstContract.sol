// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

contract FirstContract {
  address public owner;
  string public ownerName = "Chiquito de la Calzada";
  uint256 public ownerAge = 23;
  string[] public posts;
  
  //Contract contstructor
  constructor(address _firstOwner){
    owner = _firstOwner;
  }

  modifier onlyOwner(){
    require(msg.sender == owner, "Error, you are not the owner");
    _;
  }

  modifier existsUrl(string memory _url){
    require(_existsUrl(_url), "The provided url does not exist");
    _;
  }
  modifier notExistsUrl(string memory _url){
    require(!_existsUrl(_url), "The url already exists");
    _;
  }
  
  function setOwnerState(
    address _newOwner,
    string memory  _ownerName,
    uint256  _age
  ) public onlyOwner {
    owner = _newOwner;
    ownerName = _ownerName;
    ownerAge = _age;
  }

  function addPostUrl(string memory _url) public onlyOwner notExistsUrl(_url) {
    posts.push(_url);
  }

  function deletePostUrl(string memory _url) public onlyOwner existsUrl(_url) {
    for(uint i=0; i<posts.length; i++){
      if(keccak256(abi.encodePacked(_url))
          ==
        keccak256(abi.encodePacked(posts[i]))){
        delete posts[i];
      }
    }
  }

  function getPosts() public view returns(string[] memory){
    return posts;
  }

  function _existsUrl(string memory _url) private view returns(bool) {
    for(uint i=0; i<posts.length; i++){
        if(keccak256(abi.encodePacked(_url)) == keccak256(abi.encodePacked(posts[i]))){
          return true;
        }
    }
    return false;
  }
}
