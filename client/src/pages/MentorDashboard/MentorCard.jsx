/* eslint-disable react/prop-types */
import { Avatar, Group, Table, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MentorCard = ({item}) => {

    const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user.currentUser.mentor._id;
  console.log(userId);
  const [requestor, setRequestor] = useState();

  const onAccepting = () => {
    //we have to navigate to specific route
    axios.post('/request/acceptRequest', {
      mentorId: userId, 
      requestorId:requestor?._id,
      time: item.time,
      date: item.date,
      code: userId,
    })

    if(userId)
    {
      navigate(`/room/${userId}`);
    }
  }

  const fetchRequestor = async () => {  
    axios.post('/getallmentors/getRequestor', {userId: item.user}).then((res) => {
      console.log(res.data);
      setRequestor(res.data);
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  useEffect(()=>{
    fetchRequestor();
  },[])

    return (
        <Table.Tr key={item.id}>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} src={item.avatar} radius={26} />
              <Text size="sm" fw={500}>
                {requestor?.firstName} {requestor?.lastName}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>
            {requestor?.needs.map((skill) => (
              <Text key={skill} className="inline mr-2" size="sm" color="gray">
                {skill}
              </Text>
            ))}
          </Table.Td>
          <Table.Td>{item.date} {item.time}</Table.Td>
          <Table.Td>
            <div className="flex gap-6 justify-center">
              <button onClick={onAccepting}>
                <IconCheck className="text-green-600" />
              </button>
              <button>
                <IconX className="text-red-600" />
              </button>
            </div>
          </Table.Td>
        </Table.Tr>
    );
}

export default MentorCard