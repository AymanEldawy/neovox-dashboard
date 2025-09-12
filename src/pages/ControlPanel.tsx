import CategoryRateForm from '@/components/admin/control/CategoryRateForm'
import ControlPanelLog from '@/components/admin/control/ControlPanelLog';
import RushWindowForm from '@/components/admin/control/RushWindowForm';
import VacationForm from '@/components/admin/control/VacationForm';
import ZoneForm from '@/components/admin/control/ZoneForm';

const ControlPanel = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ZoneForm />
          <CategoryRateForm />
        </div>
        <div className="space-y-8">
          <RushWindowForm />
          <VacationForm />
        </div>
      </div>
      <ControlPanelLog />
    </div>
  )
}

export default ControlPanel