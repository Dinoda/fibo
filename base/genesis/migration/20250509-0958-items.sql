CREATE TABLE `item` (
	id INTEGER PRIMARY KEY,
	singular VARCHAR(250) NOT NULL,
	adjective SMALLINT NOT NULL,
	plural VARCHAR(250) NOT NULL,
	possessive SMALLINT NOT NULL,
	startWithVowel SMALLINT NOT NULL,
	unknown SMALLINT NOT NULL,
	pronoun SMALLINT NOT NULL,
	article SMALLINT NOT NULL,
	description TEXT NOT NULL,
	name VARCHAR(250) NOT NULL,
	-- Image (table ?)
	icon INTEGER NOT NULL,
	-- ItemLevel (table)
	levelItem INTEGER NOT NULL,
	rarity SMALLINT NOT NULL,
	filterGroup SMALLINT NOT NULL,
	-- AdditionalData - Row (Table ?)
	additionalData INTEGER NOT NULL,
	-- ItemUICategory - ItemUICategory Table
	itemUICategory INTEGER NOT NULL,
	-- ItemSearchCategory
	itemSearchCategory INTEGER NOT NULL,
	-- EquipSlotCategory
	equipSlotCategory INTEGER NOT NULL,
	-- ItemSortCategory
	itemSortCategory INTEGER NOT NULL,
	unknown2 INTEGER NOT NULL,
	stackSize INTEGER NOT NULL,
	isUnique BOOLEAN NOT NULL,
	isUntradable BOOLEAN NOT NULL,
	isIndisposable BOOLEAN NOT NULL,
	lot BOOLEAN NOT NULL,
	priceMid INTEGER NOT NULL,
	priceLow INTEGER NOT NULL,
	canHQ BOOLEAN NOT NULL,
	dyeCount SMALLINT NOT NULL,
	isCrestWorthy BOOLEAN NOT NULL,
	-- ItemAction
	itemAction INTEGER NOT NULL,
	castTime SMALLINT NOT NULL,
	cooldown INTEGER NOT NULL,
	-- ClassJob
	classJobRepair INTEGER NOT NULL,
	-- ItemRepairResource
	itemRepair INTEGER NOT NULL,
	-- Item
	itemGlamour INTEGER NOT NULL,
	desynth INTEGER NOT NULL,
	collectable BOOLEAN NOT NULL,
	alwaysCollectable BOOLEAN NOT NULL,
	aetherialReduce SMALLINT NOT NULL,
	levelEquip SMALLINT NOT NULL,
	requiredPVPRank SMALLINT NOT NULL,
	equipRestriction SMALLINT NOT NULL,
	-- ClassJobCategory
	classJobCategory INTEGER NOT NULL,
	-- GrandCompany
	grandCompany INTEGER NOT NULL,
	-- ItemSeries
	itemSeries INTEGER NOT NULL,
	baseParamModifier SMALLINT NOT NULL,
	modelMain INTEGER NOT NULL,
	modelSub INTEGER NOT NULL,
	-- ClassJob
	classJobUse INTEGER NOT NULL,
	unknown3 SMALLINT NOT NULL,
	damagePhysical INTEGER NOT NULL,
	damageMagical INTEGER NOT NULL,
	delay INTEGER NOT NULL,
	unknown4 SMALLINT NOT NULL,
	blockRate INTEGER NOT NULL,
	block INTEGER NOT NULL,
	defensePhysical INTEGER NOT NULL,
	defenseMagical INTEGER NOT NULL,
	-- BaseParam
	baseParam0 INTEGER NOT NULL,
	baseParamValue0 INTEGER NOT NULL,
	-- BaseParam
	baseParam1 INTEGER NOT NULL,
	baseParamValue1 INTEGER NOT NULL,
	-- BaseParam
	baseParam2 INTEGER NOT NULL,
	baseParamValue2 INTEGER NOT NULL,
	-- BaseParam
	baseParam3 INTEGER NOT NULL,
	baseParamValue3 INTEGER NOT NULL,
	-- BaseParam
	baseParam4 INTEGER NOT NULL,
	baseParamValue4 INTEGER NOT NULL,
	-- BaseParam
	baseParam5 INTEGER NOT NULL,
	baseParamValue5 INTEGER NOT NULL,
	-- ItemSpecialBonus
	itemSpecialBonus INTEGER NOT NULL,
	itemSpecialBonusParam SMALLINT NOT NULL,
	-- BaseParam
	baseParamSpecial0 INTEGER NOT NULL,
	baseParamValueSpecial0 INTEGER NOT NULL,
	-- BaseParam
	baseParamSpecial1 INTEGER NOT NULL,
	baseParamValueSpecial1 INTEGER NOT NULL,
	-- BaseParam
	baseParamSpecial2 INTEGER NOT NULL,
	baseParamValueSpecial2 INTEGER NOT NULL,
	-- BaseParam
	baseParamSpecial3 INTEGER NOT NULL,
	baseParamValueSpecial3 INTEGER NOT NULL,
	-- BaseParam
	baseParamSpecial4 INTEGER NOT NULL,
	baseParamValueSpecial4 INTEGER NOT NULL,
	-- BaseParam
	baseParamSpecial5 INTEGER NOT NULL,
	baseParamValueSpecial5 INTEGER NOT NULL,
	materializeType SMALLINT NOT NULL,
	materiaSlotCount SMALLINT NOT NULL,
	isAdvancedMeldingPermitted BOOLEAN NOT NULL,
	isPVP BOOLEAN NOT NULL,
	subStatCategory SMALLINT NOT NULL,
	isGlamourous BOOLEAN NOT NULL
);
