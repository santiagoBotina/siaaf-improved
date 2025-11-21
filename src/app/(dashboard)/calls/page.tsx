import CallsTable from "@/app/components/CallsTable";
import { CallStatus } from "@/app/components/CallsTable/types";

const callsData = [
  {
    id: "1",
    agent: "Victor WP",
    client: "Milena R.",
    duration: "15 min",
    time: "10:00 AM",
    creationDate: "2024-01-15",
    status: CallStatus.COMPLETED,
  },
  {
    id: "2",
    agent: "Carla WP",
    client: "Juan Carlos B.",
    duration: "20 min",
    time: "11:30 AM",
    creationDate: "2024-01-16",
    status: CallStatus.IN_PROGRESS,
  },
  {
    id: "3",
    agent: "Victor Telegram",
    client: "Maria G.",
    duration: "10 min",
    time: "09:00 AM",
    creationDate: "2024-01-17",
    status: CallStatus.COMPLETED,
  },
  {
    id: "4",
    agent: "Sofia WP",
    client: "Hugo S.",
    duration: "25 min",
    time: "14:00 PM",
    creationDate: "2024-01-18",
    status: CallStatus.COMPLETED,
  },
  {
    id: "5",
    agent: "Sophia WP",
    client: "Martin T.",
    duration: "12 min",
    time: "16:30 PM",
    creationDate: "2024-01-19",
    status: CallStatus.IN_PROGRESS,
  },
  {
    id: "6",
    agent: "Victor Telegram",
    client: "Rodolfo M.",
    duration: "8 min",
    time: "08:45 AM",
    creationDate: "2024-01-20",
    status: CallStatus.FAILED,
  },
  {
    id: "7",
    agent: "Carla WP",
    client: "Julio C.",
    duration: "35 min",
    time: "13:15 PM",
    creationDate: "2024-01-21",
    status: CallStatus.COMPLETED,
  },
  {
    id: "8",
    agent: "Oswaldo GPT",
    client: "Cristina L.",
    duration: "18 min",
    time: "15:45 PM",
    creationDate: "2024-01-22",
    status: CallStatus.IN_PROGRESS,
  },
];

const tableHeaders = [
  "ID",
  "Agente",
  "Cliente",
  "Duración",
  "Tiempo",
  "Fecha de Creación",
  "Estado",
];

export default function CallsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <CallsTable callsData={callsData} tableHeaders={tableHeaders} />
      </div>
    </>
  );
}
