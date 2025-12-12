export interface Speaker {
    id: string
    name: string
    title: string
    description?: string
    file?: File       // store actual File for upload
    imageUrl?: string // optional preview URL
  }
  
  export interface SpeakerFormData {
    speakers: Speaker[]
  }
  