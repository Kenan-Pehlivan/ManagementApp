import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";
import DHBWLogo from "@/assets/DHBW-Logo.svg.png"


const ContactsContainer = () => {

  const{ setDirectMessagesContacts, directMessagesContacts, channels, setChannels } = useAppStore();

  useEffect(()=>{
    const getContacts = async () => {
    const response = await apiClient.get(GET_DM_CONTACTS_ROUTES,{withCredentials:true,});
    if(response.data.contacts){
      setDirectMessagesContacts(response.data.contacts);
    };
    };
    
        const getChannels = async () => {
        const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {withCredentials:true});
        if(response.data.channels){
          setChannels(response.data.channels);
        };
        };
        getContacts();
        getChannels();

  
  },[setChannels, setDirectMessagesContacts, directMessagesContacts]);


  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
           <Logo /> 
        </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <Title text="Direct Messages" />
            <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts}/>
        </div>
        <div className="my-5">
         <div className="flex items-center justify-between pr-10">
            <Title text="Channels" />
            <CreateChannel />
         </div>
         <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true}/>
        </div>
        </div>
      </div>
       <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;


const Logo = () => {
    return (  
          <div className="flex p-5 justify-start items-center gap-3 border-b-2 border-[#2c343c] w-full mb-3">
            <img src={DHBWLogo} alt="DHBW Logo" className="h-12 w-auto" />
            <span className="text-3xl font-semibold">
              <span className="text-red-600">DH</span>BW-CHATTY</span>
          </div>
       
    );
  };


  const Title = ({ text })=> {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    )
  }
  
  