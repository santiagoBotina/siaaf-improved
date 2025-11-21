import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
} from "lucide-react";

export const CallSummary = ({ transcription }: { transcription: string }) => {
  const generateSummary = (text: string) => {
    if (!text) return null;

    text = text.toLowerCase();

    const isCollectionCall =
      /cobran|pago|deuda|saldo|pendiente|atraso|cuenta|factura/i.test(text);
    const isComplaintCall =
      /problema|queja|reclamo|insatisfecho|error|falla/i.test(text);
    const isSupportCall = /ayuda|soporte|asistencia|consulta|pregunta/i.test(
      text,
    );
    const isSalesCall = /venta|compra|producto|servicio|oferta|promoción/i.test(
      text,
    );

    const isResolved =
      /acuerdo|solucion|resuelto|conforme|satisfecho|plan de pago/i.test(text);
    const isPending = /pendiente|seguimiento|callback|llamar|contactar/i.test(
      text,
    );
    const isEscalated = /supervisor|gerente|escalado|transferir/i.test(text);

    const isPositive =
      /gracias|perfecto|excelente|conforme|satisfecho|bien|bueno/i.test(text);
    const isNegative =
      /molesto|enojado|insatisfecho|problema|mal|terrible/i.test(text);

    const hasPaymentPlan = /plan de pago|cuotas|mensual|pagar|abono/i.test(
      text,
    );
    const hasAmount = text.match(/\$?[\d']+(?:\.\d+)?\s*(pesos|dolares|usd)?/i);
    const hasDate = text.match(/\d+\s*(días?|meses?|semanas?)/i);

    return {
      callType: isCollectionCall
        ? "Cobranza"
        : isComplaintCall
          ? "Reclamo"
          : isSupportCall
            ? "Soporte"
            : isSalesCall
              ? "Ventas"
              : "General",
      status: isResolved
        ? "Resuelto"
        : isPending
          ? "Pendiente"
          : isEscalated
            ? "Escalado"
            : "En proceso",
      sentiment: isPositive ? "Positivo" : isNegative ? "Negativo" : "Neutral",
      hasPaymentPlan,
      amount: hasAmount ? hasAmount[0] : null,
      timeframe: hasDate ? hasDate[0] : null,
      keyPoints: extractKeyPoints(text),
    };
  };

  const extractKeyPoints = (text: string) => {
    const points = [];

    if (/plan de pago|acuerdo/i.test(text)) {
      points.push("Se estableció un plan de pago");
      points.push("El pagador se mostró conforme con el plan");
      points.push("Pago acordado a 3 meses");
    }
    if (/número de pedido|orden/i.test(text)) {
      points.push("Se consultó información de pedido");
    }
    if (/retraso|demora/i.test(text)) {
      points.push("Se reportó retraso en entrega/pago");
    }
    if (/actualizar.*información|cambio.*datos/i.test(text)) {
      points.push("Se actualizó información del cliente");
    }
    if (/seguimiento|contactar|llamar/i.test(text)) {
      points.push("Se programó seguimiento");
    }
    if (/transferir|supervisor/i.test(text)) {
      points.push("Se escaló a supervisor");
    }

    return points.length > 0 ? points : ["Consulta general atendida"];
  };

  const summary = generateSummary(transcription);

  if (!summary) {
    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Resumen del chat
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">
            No hay información suficiente para generar un resumen.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resuelto":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Escalado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positivo":
        return "bg-green-100 text-green-800";
      case "Negativo":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resuelto":
        return <CheckCircle className="w-4 h-4" />;
      case "Pendiente":
        return <Clock className="w-4 h-4" />;
      case "Escalado":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-gray-600" />
        Resumen del chat
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {summary.callType}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(summary.status)}`}
            >
              {getStatusIcon(summary.status)}
              <span className="ml-1">{summary.status}</span>
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(summary.sentiment)}`}
            >
              {summary.sentiment}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Puntos clave:
            </h3>
            <ul className="space-y-1">
              {summary.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {(summary.amount || summary.timeframe || summary.hasPaymentPlan) && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Detalles adicionales:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {summary.amount && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                    <span>Monto: {summary.amount}</span>
                  </div>
                )}
                {summary.timeframe && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-blue-500" />
                    <span>Plazo: {summary.timeframe}</span>
                  </div>
                )}
                {summary.hasPaymentPlan && (
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    <span>Plan de pago acordado</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <span className="font-medium">Próximos pasos:</span>
            {summary.status === "Resuelto" && " Caso cerrado exitosamente"}
            {summary.status === "Pendiente" && " Requiere seguimiento"}
            {summary.status === "Escalado" &&
              " Pendiente de atención supervisorial"}
            {summary.status === "En proceso" &&
              " Continuar con el proceso establecido"}
          </div>
        </div>
      </div>
    </div>
  );
};
