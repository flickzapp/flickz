import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlignMentButtonContainer from "./AlignMentButtonContainer";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Film,
  MoreHorizontal,
  MoveDownIcon,
  MoveUpIcon,
  PlusIcon,
  Ratio,
  Trash,
  Type,
  Wand,
} from "lucide-react";
export default function TypographyMenu() {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Typography</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Inter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inter">Inter</SelectItem>
          <SelectItem value="Noto-Sans">Noto Sans</SelectItem>
          <SelectItem value="Roboto">Roboto</SelectItem>
          <SelectItem value="Poppins">Poppins</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-4 ">
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Bold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="w-800">Bold</SelectItem>
              <SelectItem value="w-400">Regular</SelectItem>
              <SelectItem value="w-600">Medium</SelectItem>
              <SelectItem value="w-900s">Extra Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Regular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LG">Regular</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
              <SelectItem value="2XL">2XL</SelectItem>
              <SelectItem value="3XL">3XL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlignMentButtonContainer />
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Background Fill</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Solid" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="solid">Solid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
