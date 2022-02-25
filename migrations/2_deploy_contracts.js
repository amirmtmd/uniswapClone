const Factory = artifacts.require("UniswapV3Factory.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory);
  const factory = await Factory.deployed();
  //   factory.setOwner(addresses[0]);

  let token1Address, token2Address;
  if (network === "mainnet") {
    token1Address = "";
    token2Address = "";
  } else {
    await deployer.deploy(Token1);
    await deployer.deploy(Token2);
    const token1 = await token1.deployed();
    const token2 = await token2.deployed();
    token1Address = token1.address;
    token2Address = token2.address;
  }

  await factory.createPair(token1Address, token2Address);
};
