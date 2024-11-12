import { useCallback, useEffect, useState } from "react";
import localStorage from "redux-persist/es/storage";
import './table.css'
interface UseTableProps {
  defaultDense?: boolean;
  defaultOrderBy?: string;
  defaultOrder?: "asc" | "desc";
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  defaultSelected?: any[];
}

export default function useTable(props: UseTableProps) {
  const [dense, setDense] = useState<boolean>(!!props?.defaultDense);
  const [orderBy, setOrderBy] = useState<string>(
    props?.defaultOrderBy || "name"
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    props?.defaultOrder || "asc"
  );
  const [page, setPage] = useState<number>(props?.defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    props?.defaultRowsPerPage || 10
  );
  const [selected, setSelected] = useState<any[]>(props?.defaultSelected || []);

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === "asc";
      if (id !== "") {
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (id: any) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: any[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, newSelecteds: any[]) => {
      if (checked) {
        setSelected(newSelecteds);
      } else {
        setSelected([]);
      }
    },
    []
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPage(0);
      const value = parseInt(event.target.value, 10);
      localStorage.setItem("table-rows-per-page", value.toString());
      setRowsPerPage(value);
    },
    []
  );

  const onChangeDense = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      localStorage.setItem("table-dense", value.toString());
      setDense(value);
    },
    []
  );

  useEffect(() => {
    (async () => {
      const rowDenseStorage = await localStorage?.getItem("table-dense");
      if (rowDenseStorage) setDense(rowDenseStorage === "true");

      const rowsPerPageStorage = await localStorage?.getItem(
        "table-rows-per-page"
      );
      if (rowsPerPageStorage) setRowsPerPage(parseInt(rowsPerPageStorage, 10));
    })();
  }, []);

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage
  };
}
