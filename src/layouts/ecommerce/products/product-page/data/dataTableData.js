// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";

// ProductPage page components
import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import ReviewCell from "layouts/ecommerce/products/product-page/components/ReviewCell";
import DefaultCell from "layouts/ecommerce/products/product-page/components/DefaultCell";

// Images
import blackChair from "assets/images/ecommerce/black-chair.jpeg";
import chairPink from "assets/images/ecommerce/chair-pink.jpeg";
import chairSteel from "assets/images/ecommerce/chair-steel.jpeg";
import chairWood from "assets/images/ecommerce/chair-wood.jpeg";

const dataTableData = {
  columns: [
    { Header: "CAM ID", accessor: "product" },
    { Header: "THỜI GIAN", accessor: "price" },
    { Header: "Loại Lỗi", accessor: "review", align: "center" },
    { Header: "TRẠNG THÁI XỬ LÍ", accessor: "availability", align: "center" },
    { Header: "VỊ TRÍ", accessor: "id", align: "center" },
  ],

  rows: [
    {
      product: (
        <ProductCell image={blackChair} name="Christopher Knight Home" />
      ),
      price: <DefaultCell>$89.53</DefaultCell>,
      review: <ReviewCell rating={4.5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={80} color="success" />
        </MDBox>
      ),
      id: <DefaultCell>230019</DefaultCell>,
    },
    {
      product: (
        <ProductCell image={chairPink} name="Bar Height Swivel Barstool" />
      ),
      price: <DefaultCell>$99.99</DefaultCell>,
      review: <ReviewCell rating={5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={90} color="success" />
        </MDBox>
      ),
      id: <DefaultCell>87120</DefaultCell>,
    },
    {
      product: (
        <ProductCell image={chairSteel} name="Signature Design by Ashley" />
      ),
      price: <DefaultCell>$129.00</DefaultCell>,
      review: <ReviewCell rating={4.5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={60} color="warning" />
        </MDBox>
      ),
      id: <DefaultCell>412301</DefaultCell>,
    },
    {
      product: <ProductCell image={chairWood} name="Modern Square" />,
      price: <DefaultCell>$59.99</DefaultCell>,
      review: <ReviewCell rating={3.5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={40} color="warning" />
        </MDBox>
      ),
      id: <DefaultCell>001992</DefaultCell>,
    },
  ],
};

export default dataTableData;
