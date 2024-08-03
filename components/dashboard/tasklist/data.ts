import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "hata",
    label: "Hata",
  },
  {
    value: "gelistirme",
    label: "Geliştirme",
  },
  {
    value: "dokumentasyon",
    label: "Dökümentasyon",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Yapılacak",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "Devam",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Tamamlandı",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "İptal",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Düşük",
    value: "düsük",
    icon: ArrowDownIcon,
  },
  {
    label: "Orta",
    value: "orta",
    icon: ArrowRightIcon,
  },
  {
    label: "Yüksek",
    value: "yüksek",
    icon: ArrowUpIcon,
  },
];
