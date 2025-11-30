import { IoChevronForward, IoSettings, IoColorPalette, IoLanguage, IoPeople, IoPerson, IoNotifications } from "react-icons/io5";

const Settings = () => {
  const sections = [
    {
      title: "General",
      items: [
        { label: "App Settings", subtitle: "Manage the app's core settings", icon: IoSettings },
        { label: "Theme", subtitle: "Customize the app's appearance", icon: IoColorPalette },
        { label: "Language", subtitle: "Select your preferred language", icon: IoLanguage },
      ],
    },
    {
      title: "User Permissions",
      items: [
        { label: "Role Management", subtitle: "Control access for different user roles", icon: IoPeople },
        { label: "User Accounts", subtitle: "Manage individual user accounts", icon: IoPerson },
      ],
    },
    {
      title: "Notifications",
      items: [
        { label: "Notification Preferences", subtitle: "Configure notification settings", icon: IoNotifications },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application preferences</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition">
                        <item.icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <IoChevronForward className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
