"use client";

import {
  AccessIcon,
  CompanyIcon,
  CountryIcon,
  DepartmentIcon,
  MailIcon,
  PhoneIcon,
  RoleIcon
} from "@/app/SharedComponents/Icons";
import { useUsersStore } from "@/domain/store/users";
import classNames from "classnames";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { RefObject } from "react";
import './UserCard.scss';
import UserRole from "./UserRole";


export type UserCardProps = {
  userId: number;
  ref?: RefObject<HTMLDivElement | null>;
} & HTMLMotionProps<"div">;

const UserCard = ({ userId, ...props }: UserCardProps) => {
  const user = useUsersStore().data[userId];
  if (!user) return null;

  const { image, firstName, lastName, phone, company, email, address, role } = user;

  return (
    <motion.div {...props} className={classNames('UserCardMainContainer', props.className)}>
      <div className='UserCardHeader' />
      <img className='UsersCardIcon' src={image} alt={''} />
      <div className="text-2xl font-bold">{`${firstName} ${lastName}`}</div>
      <div>{`${company.title} at ${company.name}`}</div>
      <div className="text-sm mt-3 mb-1 opacity-50">Details</div>
      <table>
        <tbody>
          <tr>
            <td><CompanyIcon width={24} height={24} /></td>
            <td>Company</td>
            <td>{company.name}</td>
          </tr>
          <tr>
            <td><RoleIcon width={24} height={24} /></td>
            <td>Role</td>
            <td>{company.title}</td>
          </tr>
          <tr>
            <td><DepartmentIcon width={24} height={24} /></td>
            <td>Department</td>
            <td>{company.department}</td>
          </tr>
          <tr>
            <td><PhoneIcon width={24} height={24} /></td>
            <td>Phone</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td><MailIcon width={24} height={24} /></td>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td><AccessIcon width={24} height={24} /></td>
            <td>Access</td>
            <td><div className='flex'><UserRole role={role} /></div></td>
          </tr>
          <tr>
            <td><CountryIcon width={24} height={24} /></td>
            <td>Country</td>
            <td>{address.country}</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default UserCard;
