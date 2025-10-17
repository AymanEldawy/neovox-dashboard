import { Award, Target } from "lucide-react";
import { useEffect, useState } from "react";
import {getUserMissionTypeStats} from "@/services/dashboardService.ts";

interface Task {
    mission_type: string;
    completed_count: number;
    pending_count: number;
    total_per_type: number;
}

interface MissionStats {
    perType: Task[];
    overall_total: number;
}

const TasksOverview = () => {
    const [tasks, setTasks] = useState<MissionStats>({ perType: [], overall_total: 0 });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getUserMissionTypeStats();
                setTasks(response.data);
            } catch (error) {
                console.error("Failed to fetch mission stats:", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Tasks Overview</h2>
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="font-bold text-gray-800">{tasks.overall_total} Completed</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tasks.perType.map((task) => (
                    <div key={task.mission_type} className="border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg text-gray-800">{task.mission_type}</h3>
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Completed</span>
                                <span className="font-bold text-green-600">{task.completed_count}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending</span>
                                <span className="font-bold text-yellow-600">{task.pending_count}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-sm font-semibold text-gray-700">Total</span>
                                <span className="font-bold text-gray-800">{task.total_per_type}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksOverview;