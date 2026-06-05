// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StreetCredTap {
    mapping(address => uint256) public userTaps;
    uint256 public totalTaps;

    event Tapped(address indexed user, uint256 userTaps, uint256 totalTaps);

    function tap() external {
        unchecked {
            userTaps[msg.sender] += 1;
            totalTaps += 1;
        }

        emit Tapped(msg.sender, userTaps[msg.sender], totalTaps);
    }
}
