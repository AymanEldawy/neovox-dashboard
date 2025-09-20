import { Switch } from '@/components/forms/fields';
import { CloseIcon } from '@/components/Icons';
import Btn from '@/components/shared/Btn';
import Modal from '@/components/shared/Modal'
import { useTranslation } from 'react-i18next';

const TableColumnVisibility = ({ open, name, onClose, table }) => {
  const { t } = useTranslation('headers')
  return (
    <Modal onClose={onClose} open={open} isDrawer>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-2 border-b pb-2'>
          <h3 className='text-lg font-medium capitalize'>{t(name)}</h3>
          <div className='ltr:ml-auto'>
            <Switch
              checked={table.getIsAllColumnsVisible()}
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
          </div>
          <Btn
            type="button"
            kind="error"
            onClick={onClose}
          >
            <CloseIcon className="w-6 h-6" />
          </Btn>
        </div>
        <ul className="flex flex-col">
          {table.getAllLeafColumns().map((column) => {
            return (
              <li
                key={column.id}
                className="border-b last:border-none py-2 border-gray-300 text-sm capitalize flex items-center justify-between gap-4 "
              >
                {column.id}
                <Switch
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  )
}

export default TableColumnVisibility