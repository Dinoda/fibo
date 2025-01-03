const typeToDefault = {
  string: def => "'" + def + "'"
};

const typeToType = {
  string: "text",
  number: "numeric"
};

const rangeTypeToType = {
  string: "varchar",
  number: "numeric"
};

class TableInfo {
  constructor(model) {
    this.name = model.name;
    this.columns = {};
    for (const fld of model.fields) {
      let col = this.identifier(fld.name);

      col += " " + this.type(fld.type, fld.range).toUpperCase();

      if (fld.key) {
        col += " PRIMARY KEY";
      }

      if (fld.auto) {
        col += " AUTO_INCREMENT";
      }

      if (!fld.null) {
        if (!fld.key) {
          col += " NOT NULL";
        }
      } else {
        if (fld.default) {
          col +=
            " DEFAULT " +
            (typeToDefault[type]
              ? typeToDefault[type](fld.default)
              : fld.default);
        } else {
          col += " DEFAULT NULL";
        }
      }
    }
  }

  type(type, range) {
    if (!range) {
      return typeToType[type] ? typeToType[type] : type;
    } else {
      return rangeTypeToType[type]
        ? rangeTypeToType[type] + "(" + range + ")"
        : type + "(" + range + ")";
    }
  }

  identifier(ident) {
    return "`" + ident + "`";
  }
}
