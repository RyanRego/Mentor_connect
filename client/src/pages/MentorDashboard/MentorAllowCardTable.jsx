/* eslint-disable react/prop-types */
import { Table, ScrollArea} from "@mantine/core";

import MentorCard from "./MentorCard";

export default function MentorAllowCardTable({sessions}) {

    const rows = sessions?.map((item) => {
        return <MentorCard key={item.time} item={item}/>
    });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Mentee</Table.Th>
            <Table.Th>Guidance Needed</Table.Th>
            <Table.Th>Date and Time</Table.Th>
            <Table.Th>Request Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}