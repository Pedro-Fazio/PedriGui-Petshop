import React from "react";
import "./BoxLog.scss";
import api from "../Db/Db";

const generateList = (array) => array.map((row) => generateItem(row));

const generateItem = (array) => (
  <>
    <div className="item item-1">{array[0]}</div>
    {array.slice(1).map((item) => (
      <div className="item" key={item}>
        {item}
      </div>
    ))}
  </>
);

const generateBoxHeader = (labels) =>
  labels.map((label) => <div key={label}>{label}</div>);

const BoxLog = ({ title, headerLabels, getData }) => {
  const [Inventory, setInventory] = React.useState();
  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const [popUpInputs, setPopUpInputs] = React.useState([]);
  const [popUpType, setPopUpType] = React.useState();
  const [isDisabled, setIsDisabled] = React.useState(true);

  const ID_LEN = 8;
  const AddLayout = [
    ["Nome", ""],
    ["Foto", ""],
    ["Preco", ""],
    ["Estoque", ""],
    ["Oferta", false, "bool"],
    ["Frete Gratis", false, "bool"],
    ["Descricao", ""],
    ["Tags", ""],
  ];

  const EditLayout = [["Código", ""], ...AddLayout];

  const DeleteLayout = [["Código", ""]];

  React.useEffect(
    (_) => {
      if (!Array.isArray(Inventory))
        api.getProducts().then((products) => {
          setInventory(products.filter((p) => !p.deleted));
        });
    },
    [Inventory]
  );

  React.useEffect(
    (_) => {
      // Edit Product
      if (Inventory)
        if (
          popUpInputs.length > 2 &&
          popUpInputs[0][0] === "Código" &&
          popUpInputs[0][1].length === ID_LEN
        ) {
          if (isDisabled) {
            let input = Array.from({ length: EditLayout.length }).fill("");
            input[0] = popUpInputs[0][1];

            for (let I of Inventory)
              if (I._id.slice(0, ID_LEN) === popUpInputs[0][1]) {
                input = [
                  I._id.slice(0, ID_LEN),
                  I.Nome,
                  I.Foto,
                  I.Preco,
                  I.Estoque,
                  I.Oferta,
                  I.FreteGratis,
                  I.Descricao,
                  I.Tags.join(","),
                ];
                break;
              }

            let popUpIn = [...EditLayout];

            setPopUpInputs(
              popUpIn.map((P, idx) => {
                P[1] = input[idx];
                return P;
              })
            );
            setIsDisabled(false);
          }
        } else setIsDisabled(true);
    },
    [popUpInputs]
  );
  const ParseInventory = (Inventory) =>
    Inventory.map((I) => [
      I._id.slice(0, ID_LEN),
      <div
        className="img cover"
        style={{
          backgroundImage: `url(${require("../../Images/produtos/" + I.Foto)})`,
        }}
      ></div>,
      I.Nome,
      I.Estoque,
      I.Preco,
    ]);

  const handleClick = (action) => {
    switch (action) {
      case "Edit":
        setPopUpInputs([...EditLayout]);
        setPopUpType("Edit");
        break;
      case "Add":
        console.log("Add", AddLayout);
        setPopUpInputs([...AddLayout]);
        setPopUpType("Add");
        break;
      case "Delete":
        console.log("Delete", DeleteLayout);
        setPopUpInputs([...DeleteLayout]);
        setPopUpType("Delete");
        break;
      default:
        break;
    }
    setIsPopUpVisible(!isPopUpVisible);
  };

  const handleAction = (e) => {
    switch (popUpType) {
      case "Edit":
        try {
          let { _id, ...Product } = Inventory.find(
            (I) => I._id.slice(0, ID_LEN) === popUpInputs[0][1]
          );
          let [id, ...inputParse] = popUpInputs;
          inputParse = inputParse.map((i) => i[1]);
          inputParse[2] = parseFloat(inputParse[2]);
          inputParse[3] = parseInt(inputParse[3]);
          inputParse[7] = inputParse[7].split(",");
          let idx = 0;
          for (let i in Product) {
            Product[i] = inputParse[idx++];
          }
          Product = { _id, ...Product };
          api.updateProduct(Product).then((e) => {
            console.log(Product, "oi");
            setInventory(undefined);
            alert("Produto atualizado com sucesso");
          });
          setIsPopUpVisible(false);
        } catch (e) {
          alert("Código Inválido");
        }
        break;
      case "Add":
        try {
          let { _id, ...Product } = Inventory[0];
          let inputParse = [...popUpInputs];
          console.log(_id, Product, inputParse);
          inputParse = inputParse.map((i) => {
            let value = i[1];
            if (value === "") throw new Error("Campo invalido");
            return i[1];
          });
          inputParse[2] = parseFloat(inputParse[2]);
          inputParse[3] = parseInt(inputParse[3]);
          if (!inputParse[2] || !inputParse[3])
            throw new Error("Campo invalido");
          inputParse[7] = inputParse[7].split(",");
          let idx = 0;
          for (let i in Product) {
            console.log(i, "i");
            Product[i] = inputParse[idx++];
          }
          api.AddProduct(Product).then((e) => {
            setInventory(undefined);
            alert("Produto adicionado com sucesso");
          });
          setIsPopUpVisible(false);
        } catch (e) {
          alert("Formato invalido");
        }
        break;
      case "Delete":
        try {
          const { _id } = Inventory.find(
            (I) => I._id.slice(0, ID_LEN) === popUpInputs[0][1]
          );

          api
            .deleteProduct(_id)
            .then((e) => {
              setInventory(undefined);
              alert("Produto deletado com sucesso");
            })
            .catch((e) => {
              alert("Tente novamente");
            });
          setIsPopUpVisible(false);
        } catch (e) {
          alert("Código Inválido");
        }
        break;
      default:
        break;
    }
  };

  const showInputsPopUp = (_) =>
    popUpInputs.map((p, idx) => {
      const inputs = [...popUpInputs];
      return (
        <span key={p[0]}>
          <p>{p[0]}:</p>
          <input
            value={p[1]}
            onChange={(e) => {
              inputs[idx][1] = p[2] ? e.target.checked : e.target.value;
              setPopUpInputs(inputs);
            }}
            disabled={
              inputs.length > 0 &&
              idx &&
              inputs[0][0] === "Código" &&
              isDisabled
            }
            type={p[2] ? "checkbox" : "text"}
            checked={p[1]}
          />
        </span>
      );
    });

  return (
    <div className="box-info">
      <div className="box-container">
        <div className="box-header">
          <h1>{title}</h1>
        </div>
        <div className="box-grid-container">
          <div className="box-grid">
            {" "}
            {/* Grid */}
            {generateBoxHeader(headerLabels)}
            {Inventory
              ? generateList(ParseInventory(Inventory))
              : "Carregando..."}
          </div>

          <div className="box-action">
            <div className="inventory-actions">
              <button id="buy-store" onClick={(_) => handleClick("Edit")}>
                Editar produto
              </button>
              <button id="buy-store" onClick={(_) => handleClick("Add")}>
                Add produto
              </button>
              <button id="buy-store" onClick={(_) => handleClick("Delete")}>
                Deletar produto
              </button>
            </div>
          </div>
          {isPopUpVisible && (
            <div className="box-edit-popup">
              {showInputsPopUp()}
              <button onClick={handleAction}>Confirmar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxLog;
