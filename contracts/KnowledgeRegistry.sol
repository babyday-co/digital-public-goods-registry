// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title KnowledgeRegistry
/// @notice A tamper-resistant on-chain registry for child-health knowledge public goods.
contract KnowledgeRegistry {
    struct Knowledge {
        string title;
        string contentHash;
        address contributor;
        uint256 timestamp;
    }

    mapping(string => Knowledge) private registry;

    event KnowledgeRegistered(
        string contentHash,
        string title,
        address indexed contributor,
        uint256 timestamp
    );

    /// @notice Register a knowledge entry by its content hash.
    /// @param contentHash SHA-256 hex digest of the knowledge content.
    /// @param title       Human-readable title.
    function registerKnowledge(
        string memory contentHash,
        string memory title
    ) public {
        require(bytes(contentHash).length > 0, "Hash required");
        require(bytes(title).length > 0, "Title required");
        require(
            registry[contentHash].timestamp == 0,
            "Hash already registered"
        );

        registry[contentHash] = Knowledge({
            title: title,
            contentHash: contentHash,
            contributor: msg.sender,
            timestamp: block.timestamp
        });

        emit KnowledgeRegistered(contentHash, title, msg.sender, block.timestamp);
    }

    /// @notice Retrieve a registered knowledge entry.
    /// @param contentHash SHA-256 hex digest to look up.
    function getKnowledge(
        string memory contentHash
    )
        public
        view
        returns (string memory title, address contributor, uint256 timestamp)
    {
        Knowledge memory k = registry[contentHash];
        return (k.title, k.contributor, k.timestamp);
    }
}
