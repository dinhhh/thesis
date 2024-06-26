import { useRouteMatch } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from "react";
import { request } from "api";
import StandardTable from "components/StandardTable";
import { API_PATH } from "../apiPaths";
import LoadingScreen from "components/common/loading/loading";

const ReceiptListing = () => {
  const { path } = useRouteMatch();

  const [receiptTableData, setReceiptTableData] = useState([]);
  const [isHideCommandBar, setHideCommandBar] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const columns = [
    { title: "Tên đơn hàng", field: "receiptName" },
    { title: "Kho đích", field: "warehouseName" },
    { title: "Ngày nhập hàng", field: "receivedDate" }, 
    { title: "Ngày khởi tạo", field: "createdDate" }
  ];

  useEffect(() => {
    async function fetchData() {
      await request(
        "get",
        API_PATH.RECEIPT,
        (res) => {
          setReceiptTableData(res.data);
        },
        {
          500: (e) => { errorNoti("Server hiện đang có lỗi. Vui lòng thử lại sau")},
          401: () => { },
          400: (e) => { errorNoti(e.response.data.errors[0].message); }
        }
      );

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    isLoading ? <LoadingScreen /> :
    <Fragment>
      <StandardTable 
        title={"Danh sách đơn nhập hàng"}
        columns={columns}
        data={receiptTableData}
        options={{
          selection: false,
          pageSize: 20,
          search: true,
          sorting: true,
        }}
        onRowClick={ (event, rowData) => {
          window.location.href = `${path}/update/${rowData.receiptId}`;
        } }
        actions={[
          {
            icon: <Link to={`receipt/create`}>
              <AddIcon />
            </Link>,
            tooltip: "Tạo đơn hàng mới",
            isFreeAction: true
          }
        ]}
      />
    </Fragment>)
}

export default ReceiptListing;